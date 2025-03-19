import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import fetchOneBook from '../../lib/fetch-one-book';

export const getStaticPaths = async () => {
    return {
        paths: [
            { params: { id: '1' } },
            { params: { id: '2' } },
            { params: { id: '3' } },
        ],
        //아래의 getStaticProps()의 주석처럼 id목록을 미리 정의해놓은 것 (id가 1, 2, 3인 경우의 페이지들이 미리 렌더링 될 예정)
        fallback: false,
        //fallback이 false인 경우, paths에 정의된 id가 아닌 경우 404에러가 발생함
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

    return { props: { book } };
};

export default function Page({
    book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    if (!book) return '문제가 발생했습니다. 다시 시도하세요.';
    const { id, title, subTitle, description, author, publisher, coverImgUrl } =
        book;

    return (
        <div key={id}>
            <div
                className={`relative flex justify-center p-5 bg-center bg-no-repeat bg-cover 
            before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:opacity-50 before:content-''`}
                style={{ backgroundImage: `url(${coverImgUrl})` }}
                // tailwindCSS에서 변수를 직접 사용할 때는 style태그를 직접 사용
            >
                <img className="z-1 h-full max-w-90 " src={coverImgUrl}></img>
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
