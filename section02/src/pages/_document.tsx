import { Html, Head, Main, NextScript } from 'next/document';

//기존 리액트의 index.html 역할
export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
