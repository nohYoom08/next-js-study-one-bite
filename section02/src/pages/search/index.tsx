import BookItem from '@/components/book-item';
import SearchableLayout from '@/components/searchable-layout';
import fetchBooks from '@/lib/fetch-books';
import { IBookData } from '@/types';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

//단순 getStaticProps를 사용할 경우, 빌드 시점에 데이터를 가져오기 때문에 url의 쿼리를 통한 검색 기능을 사용할 수 없음
//아래와 같이 우선 html태그만 SSG로 렌더링, 이후 fetch는 클라이언트 사이드 방식을 통해서 렌더링을 함
export default function Page() {
    const [books, setBooks] = useState<IBookData[]>([]);
    const router = useRouter();
    const { q } = router.query;

    const fetchSearchBooks = async () => {
        const data = await fetchBooks(q as string);
        setBooks(data);
    };

    useEffect(() => {
        if (q) fetchSearchBooks();
    }, [q]);
    return (
        <div>
            {books.map(item => (
                <BookItem key={item.id} {...item} />
            ))}
        </div>
    );
}

Page.getLayout = (page: ReactNode) => (
    <SearchableLayout>{page}</SearchableLayout>
);
//page에는 사실상 위의 Page컴포넌트(/search 입력시)가 전달될 예정

//2.14 강의 전까지 백업본 코드
// import BookItem from '@/components/book-item';
// import SearchableLayout from '@/components/searchable-layout';
// import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
// import { ReactNode } from 'react';
// import fetchBooks from '../../lib/fetch-books';

// export const getServerSideProps = async (
//     context: GetServerSidePropsContext,
//     //요청 헤더, 쿼리 스트링, 쿠키, 세션 등의 정보를 담고 있음
// ) => {
//     const q = context.query.q;
//     //쿼리 스트링을 가져옴
//     const books = await fetchBooks(q as string);
//     return { props: { books } };
//     //props로 전달할 데이터를 객체로 반환
// };

// export default function Page({
//     books,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//     return (
//         <div>
//             {books.map(item => (
//                 <BookItem key={item.id} {...item} />
//             ))}
//         </div>
//     );
// }

// Page.getLayout = (page: ReactNode) => (
//     <SearchableLayout>{page}</SearchableLayout>
// );
// //page에는 사실상 위의 Page컴포넌트(/search 입력시)가 전달될 예정

// 2.8 강의 전까지 백업본 코드
// import SearchableLayout from '@/components/searchable-layout';
// import { useRouter } from 'next/router';
// import { ReactNode } from 'react';

// export default function Page() {
//     const router = useRouter();
//     //라우팅과 관련된 기능(객체 반환)을 사용할 수 있게 해주는 hook
//     console.log(router);
//     const { q } = router.query;
//     return <h1>SEARCH {q}</h1>;
// }

// Page.getLayout = (page: ReactNode) => (
//     <SearchableLayout>{page}</SearchableLayout>
// );
