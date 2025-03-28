import './globals.css';
import Link from 'next/link';

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
                    <footer className="py-[100px] text-gray-500">
                        제작 @winterlood
                    </footer>
                </div>
            </body>
        </html>
    );
}
