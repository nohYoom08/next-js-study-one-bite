//전체 페이지들의 루트 역할 (기본 리액트의 App.tsx역할)
import GlobalLayout from '@/components/global-layout';
import '@/styles/globals.css';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactNode } from 'react';

// Component에 대한 타입을 NextPageWithLayout로 새로 제작
// 즉 NextPage는 Component에 대한 타입을 제공하는 것
type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
    Component,
    pageProps,
}: AppProps & { Component: NextPageWithLayout }) {
    const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
    //Component.getLayout이 존재하지 않으면(*.getLayout이 설정되어있지 않으면) page를 반환하는 함수를 getLayout으로 설정
    return (
        <GlobalLayout>
            {getLayout(<Component {...pageProps} />)}
            {/* GlobalLayout의 props(children)로 Component와 pageProps를 전달 */}

            {/*'/'로 접속할 경우 'index.tsx'의 Home컴포넌트가 렌더링되고, Home컴포넌트의 getLayout메서드가 실행되어 SearchableLayout컴포넌트로 감싸진다. */}
            {/* <SearchableLayout>
                <Component {...pageProps} />
            </SearchableLayout>
            index.tsx의 Home.getLayout을 참고, 위와 같은 형태가 '/'경로에서 실행될 것
            즉 위와같은 원리로, SearchableLayout컴포넌트(검색바)가 필요한 페이지마다 getLayout메서드를 추가해주면 됨
            */}
        </GlobalLayout>
    );
}

// 강의 2.6전까지 백업본
// import '@/styles/globals.css';
// import type { AppProps } from 'next/app';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
// //전체 페이지들의 루트 역할 (기본 리액트의 App.tsx역할)

// export default function App({ Component, pageProps }: AppProps) {
//     //Component : 렌더링될 페이지 ('/', '/search', '/book/[id]', '/test' 등)
//     //pageProps : getServerSideProps, getStaticProps로 전달받은 데이터 (페이지의 props)

//     const router = useRouter();
//     const onClickButton = () => {
//         router.push('/test');
//         //replace : 이전 페이지를 스택에서 제거
//         //back : 이전 페이지로 이동
//         //push : 새로운 페이지를 스택에 추가
//     };

//     useEffect(() => {
//         router.prefetch('/test');
//         //Next.js의 prefetch는 링크컴포넌트의 href속성에 지정된 페이지를 미리 불러옴
//         //onClickButton의 router.push('/test')와 같이 프로그로매틱한 방법에서의 prefetch는 위 코드와 같이 수행해야 함.
//     }, []);
//     return (
//         <>
//             <header>
//                 <Link href="/">index</Link>&nbsp;
//                 <Link href="/search" prefetch={false}>
//                     {/* //prefetch={false} : 해당 링크를 prefetch하지 않음 */}
//                     search
//                 </Link>
//                 &nbsp;
//                 <Link href="/book/1">book/1</Link>
//                 <div>
//                     <button onClick={onClickButton}>/test로 이동</button>
//                 </div>
//             </header>
//             <Component {...pageProps} />
//         </>
//     );
// }
