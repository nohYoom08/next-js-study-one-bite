import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import delay from '@/util/delay';
import { Metadata } from 'next';
import { Suspense } from 'react';

//현재 페이지의 메타데이터를 동적으로 생성하는 역할을 함.
//아래와 같이 async generateMetadata() 함수를 정의하는 것 자체로 설정 가능
export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
    const { q } = await searchParams;
    return {
        title: q ? `${q} 검색 결과` : '한입 북스',
        description: q
            ? `${q}에 대한 검색 결과를 확인해보세요.`
            : '한입 북스에 등록된 도서를 만나보세요.',
        openGraph: {
            title: q ? `${q} 검색 결과` : '한입 북스',
            description: q
                ? `${q}에 대한 검색 결과를 확인해보세요.`
                : '한입 북스에 등록된 도서를 만나보세요.',
            images: ['/thumbnail.png'],
        },
    };
}

async function SearchResult({ q }: { q: string }) {
    await delay(1500);
    //단순 딜레이 함수 (검색어 입력 후 1.5초 대기 (대체 UI 확인용))

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
        { cache: 'force-cache' },
        //해당 페이지는 쿼리스트링 때문에 정적 페이지로는 전환할 수 없음
        //But 한번 검색했던 데이터에 대해서는 캐시를 활용하게 할 수 있음 => 'force-cache'로 설정
    );
    // 얘는 홈페이지랑 다르게 fetch가 한 개만 있으니까 그냥 페이지 컴포넌트 안에서 처리하는 것
    if (!response.ok) return <div>에러가 발생했습니다.</div>;
    const books: BookData[] = await response.json();

    return (
        <div>
            {books.map(book => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{
        q?: string;
    }>;
}) {
    return (
        <Suspense
            key={(await searchParams).q}
            fallback={<div>로딩 중입니다...</div>}
        >
            {/* Suspense는 미완성, 미결이라는 뜻을 가지고 있음
            SearchResult의 searchParams때문에 해당 페이지는 사전렌더링과정에서 수행되지 않음
            따라서 미완성,미결 상태에서 렌더링할 수 있는 Suspense의 fallback기능 필요 
            위 Suspense 과정을 통해서 asycn의 page.tsx만 하는 것이 아닌, 기타 컴포넌트별로 세밀하게 스트리밍을 할 수 있음*/}
            {/* 또한 loading.tsx방식과 달리 쿼리스트링의 변화에 따라서도 스트리밍 기능을 구현할 수 있음 => key={searchParams.q}로 설정 */}
            <SearchResult q={(await searchParams).q || ''} />
        </Suspense>
    );
}
