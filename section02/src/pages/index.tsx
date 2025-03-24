import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import BookItem from '@/components/book-item';
import { InferGetServerSidePropsType } from 'next';
import fetchBooks from '../lib/fetch-books';
import fetchRandomBooks from '../lib/fetch-random-books';
import Head from 'next/head';

// ✅ 재사용 가능한 제목 컴포넌트 -> 한 컴포넌트 내에서 Tailwind CSS가 중복된다면 이런 방식도 고려
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-bold text-lg">{children}</h3>
);

// SSR->SSG로 변경 (단순 함수명만 변경하면 됨)
export const getStaticProps = async () => {
    console.log('인덱스 페이지');
    const [allBooks, recoBooks] = await Promise.all([
        fetchBooks(),
        fetchRandomBooks(),
    ]);
    return {
        props: { allBooks, recoBooks },
        // revalidate: 3,
        // ISR방식으로 변경 (3초마다 페이지 재생성) => 3초마다 새로고침을 하면 새로운 데이터를 가져옴
    };
};

export default function Home({
    allBooks,
    recoBooks,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
    return (
        <>
            {/* react-helmet 기능 */}
            <Head>
                <title>한입북스</title>
                <meta property="og:image" content="/thumnail.png" />
                {/* 이 HTML이 들어간 페이지를 카카오톡, 페이스북, 슬랙 등에 공유하면
                그 페이지 링크 미리보기 썸네일로 /thumnail.png 이미지가 사용
                (물론 이 경로가 절대경로나 올바른 URL이어야 실제로 보임) */}
                <meta property="op:title" content="한입북스" />
                <meta
                    property="op:description"
                    content="한입 북스에 등록된 도서들을 만나보세요"
                />
            </Head>
            <div className="flex-col">
                <section>
                    <SectionTitle>지금 추천하는 도서</SectionTitle>
                    {recoBooks.map(item => (
                        <BookItem key={item.id} {...item} />
                    ))}
                </section>
                <section>
                    <SectionTitle>등록된 모든 도서</SectionTitle>
                    {allBooks.map(item => (
                        <BookItem key={item.id} {...item} />
                    ))}
                </section>
            </div>
        </>
    );
}

// page컴포넌트를 인수로 전달하면 SearchableLayout컴포넌트의 children으로 전달되어 렌더링됨
// 자바스크립트 함수는 애초에 객체이므로, Home함수의 프로퍼티 중 getLayout이라는 속성(메서드)의 속성값을 설정하는 것 (= 메서드 추가)
Home.getLayout = (page: ReactNode) => (
    <SearchableLayout>{page}</SearchableLayout>
);

// 2.14까지의 백업본
// import SearchableLayout from '@/components/searchable-layout';
// import { ReactNode, useEffect } from 'react';
// import BookItem from '@/components/book-item';
// import { InferGetServerSidePropsType } from 'next';
// import fetchBooks from './lib/fetch-books';
// import fetchRandomBooks from './lib/fetch-random-books';

// // ✅ 재사용 가능한 제목 컴포넌트 -> 한 컴포넌트 내에서 Tailwind CSS가 중복된다면 이런 방식도 고려
// const SectionTitle = ({ children }: { children: React.ReactNode }) => (
//     <h3 className="font-bold text-lg">{children}</h3>
// );

// export const getServerSideProps = async () => {
//     const [allBooks, recoBooks] = await Promise.all([
//         fetchBooks(),
//         fetchRandomBooks(),
//     ]);
//     //Promise를 병렬로 처리할 수 있는 방식
//     return { props: { allBooks, recoBooks } };
//     //props로 전달할 데이터를 객체로 반환
// };

// export default function Home({
//     allBooks,
//     recoBooks,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//     console.log('allBooks:', allBooks);

//     useEffect(() => {
//         console.log(window);
//     }, []);
//     //useEffect는 브라우저에서 실행되기 때문에 브라우저 객체인 window를  사용할 수 있음

//     return (
//         <div className="flex-col">
//             <section>
//                 <SectionTitle>지금 추천하는 도서</SectionTitle>
//                 {recoBooks.map(item => (
//                     <BookItem key={item.id} {...item} />
//                 ))}
//             </section>
//             <section>
//                 <SectionTitle>등록된 모든 도서</SectionTitle>
//                 {allBooks.map(item => (
//                     <BookItem key={item.id} {...item} />
//                 ))}
//             </section>
//         </div>
//     );
// }

// page컴포넌트를 인수로 전달하면 SearchableLayout컴포넌트의 children으로 전달되어 렌더링됨
// 자바스크립트 함수는 애초에 객체이므로, Home함수의 프로퍼티 중 getLayout이라는 속성(메서드)의 속성값을 설정하는 것 (= 메서드 추가)
Home.getLayout = (page: ReactNode) => (
    <SearchableLayout>{page}</SearchableLayout>
);

// 2.11까지의 백업본
// import SearchableLayout from '@/components/searchable-layout';
// import { ReactNode, useEffect } from 'react';
// import books from '@/mock/books.json';
// import BookItem from '@/components/book-item';
// import { InferGetServerSidePropsType } from 'next';

// // ✅ 재사용 가능한 제목 컴포넌트 -> 한 컴포넌트 내에서 Tailwind CSS가 중복된다면 이런 방식도 고려
// const SectionTitle = ({ children }: { children: React.ReactNode }) => (
//     <h3 className="font-bold text-lg">{children}</h3>
// );

// export const getServerSideProps = () => {
//     //컴포넌트보다 먼저 실행되어서 컴포넌트에 필요한 데이터를 미리 가져와서 전달하는 역할
//     //서버사이드 렌더링을 사용할 때만 사용 가능
//     const data = 'hello';
//     return { props: { data } };
//     //props로 전달할 데이터를 객체로 반환
// };

// export default function Home({
//     data,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//     //위에서 설정해놓은 getServerSideProps함수를 통해서 props의 타입을 유추, InferGetServerSidePropsType을 사용하여 타입을 추론

//     console.log('data:', data);
//     //브라우저에서 새로고침해봤자 콘솔에 반복해서 출력되지 않음(이유는 서버사이드 렌더링으로 실행되기 때문)

//     // window.location.href = '/';
//     // 서버사이드 렌더링에서는 window객체를 사용할 수 없음 (window객체는 브라우저에서 갖고오는 것이기 때문 (undefined처리))

//     useEffect(() => {
//         console.log(window);
//     }, []);
//     //useEffect는 브라우저에서 실행되기 때문에 브라우저 객체인 window를  사용할 수 있음

//     return (
//         <div className="flex-col">
//             <section>
//                 <SectionTitle>지금 추천하는 도서</SectionTitle>
//                 {books.map(item => (
//                     <BookItem key={item.id} {...item} />
//                 ))}
//             </section>
//             <section>
//                 <SectionTitle>등록된 모든 도서</SectionTitle>
//                 {books.map(item => (
//                     <BookItem key={item.id} {...item} />
//                 ))}
//             </section>
//         </div>
//     );
// }

// Home.getLayout = (page: ReactNode) => (
//     <SearchableLayout>{page}</SearchableLayout>
// );
// // page컴포넌트를 인수로 전달하면 SearchableLayout컴포넌트의 children으로 전달되어 렌더링됨
// // 자바스크립트 함수는 애초에 객체이므로, Home함수의 프로퍼티 중 getLayout이라는 속성(메서드)의 속성값을 설정하는 것 (= 메서드 추가)
