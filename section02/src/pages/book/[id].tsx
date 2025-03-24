import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import fetchOneBook from '../../lib/fetch-one-book';
import { useRouter } from 'next/router';
import Head from 'next/head';

export const getStaticPaths = async () => {
    return {
        paths: [
            { params: { id: '1' } },
            { params: { id: '2' } },
            { params: { id: '3' } },
        ],
        //아래의 getStaticProps()의 주석처럼 id목록을 미리 정의해놓은 것 (id가 1, 2, 3인 경우의 페이지들이 미리 렌더링 될 예정)
        fallback: true,
        //fallback이 false인 경우, paths에 정의된 id가 아닌 경우 404에러가 발생함
        //blocking인 경우, 서버에서 데이터를 미리 가져와서 렌더링을 하기 때문에 느릴 수 있지만, 미리 정의된 id가 아닌 경우에도 렌더링이 가능함
        //true인 경우, 미리 정의된 id가 아닐 경우에는 일단 props(getStaticProps()'s)가 없는 페이지를 브라우저에 반환, 그 후에 서버에서 데이터를 가져와서 렌더링함
    };
};

export const getStaticProps = async (
    context: GetStaticPropsContext,
    //요청 헤더, 쿼리 스트링, 쿠키, 세션 등의 정보를 담고 있음
) => {
    const id = context.params!.id;
    // [id].tsx의 id를 갖고옴 (!는 null이 아님을 확신한다는 의미 -> 왜냐면 [id].tsx에서 id는 필수값이기 때문)
    // so query와 달리 SSG에서도 params를 사용할 수 있음
    //다만 어떤 param(id)를 사용할지는 미리 정의해야 함 (백엔드에서 미리 id목록만 받아온다던지, 미리 정의된 예시id목록을 사용한다던지)
    const book = await fetchOneBook(Number(id));

    if (!book) return { notFound: true };
    // NotFound 페이지로 리다이렉트

    return { props: { book } };
};

export default function Page({
    book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();
    if (router.isFallback)
        return (
            <>
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
                <div>로딩중입니다.</div>
            </>
        );
    //fallback이 true인 경우, 미리 정의된 id가 아닌 경우에는 일단 props(getStaticProps()'s)가 없는 페이지를 브라우저에 반환, 위 코드가 실행됨.
    //fallback 상태에서도 SEO를 적용시키기 위해 위와 같은 조건문에 Head태그 사용

    if (!book) return '문제가 발생했습니다. 다시 시도하세요.';
    //fallback이 끝난 이후에도 데이터가 없음 -> 진짜 문제 발생
    const { id, title, subTitle, description, author, publisher, coverImgUrl } =
        book;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:image" content={coverImgUrl} />
                <meta property="op:title" content={title} />
                <meta property="op:description" content={description} />
            </Head>
            <div key={id}>
                <div
                    className={`relative flex justify-center p-5 bg-center bg-no-repeat bg-cover 
            before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:opacity-50 before:content-''`}
                    style={{ backgroundImage: `url(${coverImgUrl})` }}
                    // tailwindCSS에서 변수를 직접 사용할 때는 style태그를 직접 사용
                >
                    <img
                        className="z-1 h-full max-w-90 "
                        src={coverImgUrl}
                    ></img>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-lg font-bold">{title}</div>
                    <div className="text-gray-500">{subTitle}</div>
                    <div className="text-gray-500">
                        {author} | {publisher}
                    </div>
                    <div className="bg-gray-100 p-4 leading-6 rounded-md whitespace-pre-line">
                        {description}
                    </div>
                </div>
            </div>
        </>
    );
}

// 2.15까지의 강의 코드 백업본
// import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
// import fetchOneBook from '../../lib/fetch-one-book';

// export const getServerSideProps = async (
//     context: GetServerSidePropsContext,
//     //요청 헤더, 쿼리 스트링, 쿠키, 세션 등의 정보를 담고 있음
// ) => {
//     const id = context.params!.id;
//     // [id].tsx의 id를 갖고옴 (!는 null이 아님을 확신한다는 의미 -> 왜냐면 [id].tsx에서 id는 필수값이기 때문)
//     const book = await fetchOneBook(Number(id));

//     return { props: { book } };
// };

// export default function Page({
//     book,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//     if (!book) return '문제가 발생했습니다. 다시 시도하세요.';
//     const { id, title, subTitle, description, author, publisher, coverImgUrl } =
//         book;

//     return (
//         <div key={id}>
//             <div
//                 className={`relative flex justify-center p-5 bg-center bg-no-repeat bg-cover
//             before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:opacity-50 before:content-''`}
//                 style={{ backgroundImage: `url(${coverImgUrl})` }}
//                 // tailwindCSS에서 변수를 직접 사용할 때는 style태그를 직접 사용
//             >
//                 <img className="z-1 h-full max-w-90 " src={coverImgUrl}></img>
//             </div>
//             <div className="flex flex-col gap-1">
//                 <div className="text-lg font-bold">{title}</div>
//                 <div className="text-gray-500">{subTitle}</div>
//                 <div className="text-gray-500">
//                     {author} | {publisher}
//                 </div>
//                 <div className="bg-gray-100 p-4 leading-6 rounded-md whitespace-pre-line">
//                     {description}
//                 </div>
//             </div>
//         </div>
//     );
// }

// 2.8 강의 전까지 백업본 코드
// import { useRouter } from 'next/router';

// export default function Page() {
//     const router = useRouter();
//     console.log(router);
//     const { id } = router.query;
//     //[id].tsx라고 파일명을 만든 결과

//     return <h1>Book {id}</h1>;
// }
