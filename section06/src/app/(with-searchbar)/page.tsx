//단순 '/'경로일 때 children에 렌더링되는 page.tsx
// (/(with-searchbar)/page.tsx에서 (with-searchbar) 부분은 라우팅에 포함되지 않기 때문에 '/'로 접근했을 때 children에 렌더링되는 page.tsx가 된다.)
import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import delay from '@/util/delay';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
//특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정할 수 있음
//1. auto: 아무것도 강제하지 않는 기본값 옵션 (원칙에 따라서 동적/정적 자동으로 결정)
//2. force-dynamic: 동적 페이지로 강제 설정 (스트리밍 기능 테스트를 해볼 때 유용)
//3. force-static: 정적 페이지로 강제 설정
// (searchParams등은 undefined화(검색 페이지 기능이 제대로 동작하지 않을 수 없음), no-store의 캐시 옵션은 강제로 force-cache로 설정)
//4. error: force-static과 동일하게 정적 페이지로 강제 설정하지만, 이로 인한 문제 발생시 빌드 오류를 발생시킴

async function AllBooks() {
    await delay(1500);
    //스트리밍 기능을 확인하기 위한 딜레이 테스트
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
        { cache: 'force-cache' },
        //cache: 'force-cache'는 클라이언트 측에서 캐시를 사용하라는 의미
        //cache:'no-store'는 매번 서버에서 새로 요청하라는 의미
        //next:{revalidate:3}은 3초 이후에 현재 캐시를 stale상태로 바꿈 => 나중에 요청 들어왔을 때 일단 stale상태의 캐시를 줌 => stale상태의 캐시는 새로 요청되어서 이후에 새로 refresh됨(마치 page router의 ISR과 비슷)
    );
    if (!response.ok) return <div>에러가 발생했습니다.</div>;
    const allBooks: BookData[] = await response.json();

    return (
        <>
            {allBooks.map(book => (
                <BookItem key={book.id} {...book} />
            ))}
        </>
    );
}

async function RecoBooks() {
    await delay(3000);
    //스트리밍 기능을 확인하기 위한 딜레이 테스트
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
        { next: { revalidate: 3 } },
    );
    if (!response.ok) return <div>에러가 발생했습니다.</div>;
    const recoBooks: BookData[] = await response.json();

    return (
        <>
            {recoBooks.map(book => (
                <BookItem key={book.id} {...book} />
            ))}
        </>
    );
}

//패이지 컴포넌트에 async를 추가하여 fetch로직을 직접 페이지 컴포넌트 안에 작성하는 것은 원래 불가능
//페이지 컴포넌트 내 직접적인 fetch코드로 인해 하이드레이션 과정에서 브라우저 측에서 실행 및 렌더링되고, 결국 이는 클라이언트 사이드에서 async를 렌더링하게 되는 것이므로 useHook에서 오류가 발생할 수 있기 때문
//페이지 라우터일 때도 데이터페칭 할 때 외부의 getStaticProps, getServerSideProps 함수에 async가 붙었었지 페이지 컴포넌트에는 직접 붙지 않았음.
//하지만 앱라우터에서는 서버컴포넌트가 하이드레이션 될 일이 없기 때문에 페이지 컴포넌트에 async를 붙여서 직접적으로 fetch를 사용할 수 있음
export default async function Home() {
    return (
        <div className="flex flex-col gap-5">
            <section>
                <Heading3>지금 추천하는 도서</Heading3>
                <Suspense fallback={<div>로딩 중입니다...</div>}>
                    <RecoBooks />
                </Suspense>
            </section>
            <section>
                <Heading3>등록된 모든 도서</Heading3>
                <Suspense fallback={<div>로딩 중입니다...</div>}>
                    <AllBooks />
                </Suspense>
            </section>
        </div>
    );
}
const Heading3 = ({ children }: { children: React.ReactNode }) => {
    return <h3 className="mb-0">{children}</h3>;
};
