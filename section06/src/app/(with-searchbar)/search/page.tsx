import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import delay from '@/util/delay';

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{
        q?: string;
    }>;
}) {
    await delay(1500);
    //단순 딜레이 함수 (검색어 입력 후 1.5초 대기 (대체 UI 확인용))

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${
            //searchParams는 Promise로 감싸져서 넘어오니까 await로 풀어줘야 함
            (
                await searchParams
            ).q
        }`,
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
