import Link from 'next/link';
import { ReactNode } from 'react';

export default function GlobalLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-white max-w-[600px] min-h-screen mx-auto p-5 pb-4 shadow-2xl">
            <header className="h-15 text-lg font-bold">
                <Link href="/">📚ONEBITE BOOKS</Link>
                {/* tailwind에선 text-decoration이 기본적으로 none임 */}
            </header>
            <main className="pt-[10px]">{children}</main>
            <footer className="py-25 text-gray-500">제작 @nohYoom08</footer>
        </div>
    );
}
