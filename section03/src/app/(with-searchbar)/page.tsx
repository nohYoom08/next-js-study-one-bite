//단순 '/'경로일 때 children에 렌더링되는 page.tsx
// (/(with-searchbar)/page.tsx에서 (with-searchbar) 부분은 라우팅에 포함되지 않기 때문에 '/'로 접근했을 때 children에 렌더링되는 page.tsx가 된다.)
import BookItem from '@/components/book-item';
import books from '@/mock/books.json';

export default function Home() {
    return (
        <div className="flex flex-col gap-5">
            <section>
                <Heading3>지금 추천하는 도서</Heading3>
                {books.map(book => (
                    <BookItem key={book.id} {...book} />
                ))}
            </section>
            <section>
                <Heading3>등록된 모든 도서</Heading3>
                {books.map(book => (
                    <BookItem key={book.id} {...book} />
                ))}
            </section>
        </div>
    );
}
const Heading3 = ({ children }: { children: React.ReactNode }) => {
    return <h3 className="mb-0">{children}</h3>;
};
