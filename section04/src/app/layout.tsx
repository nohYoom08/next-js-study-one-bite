import { BookData } from '@/types';
import './globals.css';
import Link from 'next/link';

async function Footer() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    );
    if (!response.ok)
        return (
            <footer className="py-[100px] text-gray-500">
                제작 @winterlood
            </footer>
        );
    const books: BookData[] = await response.json();
    const bookCount = books.length;
    return (
        <footer className="py-[100px] text-gray-500">
            <div>제작 @winterlood</div>
            <div>{bookCount}개의 도서가 들어있습니다.</div>
        </footer>
    );
}
//리퀘스트 메모이제이션을 보여주기 위한 사례
//(with-searchbar)/page.tsx와 같은 api([백엔드 url]/book)를 사용함으로써 api가 중복이 되는데, 리퀘스트 메모이제이션은 이런 중복 api를 렌더링 한 번 단위로 처리
//즉 다른 페이지나 언마운트 시에는 캐시가 삭제됨. 넥스트 서버가 중단되지 않는 한 계속 보관해주는 넥스트 서버 데이터캐시와는 다름

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <div className="max-w-[600px] min-h-screen mx-auto bg-white px-4 py-0 shadow-lg">
                    <header className="h-[60px] font-bold text-[18px] leading-[60px]">
                        <Link href={'/'}>📚 ONEBITE BOOKS</Link>
                    </header>
                    <main className="pt-2">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
