import BookItem from '@/components/book-item';
import { BookData } from '@/types';

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{
        q?: string;
    }>;
}) {
    // 얘는 홈페이지랑 다르게 fetch가 한 개만 있으니까 그냥 페이지 컴포넌트 안에서 처리하는 것
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${
            //searchParams는 Promise로 감싸져서 넘어오니까 await로 풀어줘야 함
            (
                await searchParams
            ).q
        }`,
    );
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
