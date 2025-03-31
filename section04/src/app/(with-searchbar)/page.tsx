//단순 '/'경로일 때 children에 렌더링되는 page.tsx
// (/(with-searchbar)/page.tsx에서 (with-searchbar) 부분은 라우팅에 포함되지 않기 때문에 '/'로 접근했을 때 children에 렌더링되는 page.tsx가 된다.)
import BookItem from '@/components/book-item';
import books from '@/mock/books.json';
import { BookData } from '@/types';

async function AllBooks() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
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
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
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
                <RecoBooks />
            </section>
            <section>
                <Heading3>등록된 모든 도서</Heading3>
                <AllBooks />
            </section>
        </div>
    );
}
const Heading3 = ({ children }: { children: React.ReactNode }) => {
    return <h3 className="mb-0">{children}</h3>;
};
