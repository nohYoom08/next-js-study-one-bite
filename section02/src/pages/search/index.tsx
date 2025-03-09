import BookItem from '@/components/book-item';
import SearchableLayout from '@/components/searchable-layout';
import books from '@/mock/books.json';
import { ReactNode } from 'react';

export default function Page() {
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
