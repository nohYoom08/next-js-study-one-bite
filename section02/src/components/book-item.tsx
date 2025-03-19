import { IBookData } from '@/types';
import Link from 'next/link';

export default function BookItem({
    id,
    title,
    subTitle,
    author,
    publisher,
    coverImgUrl,
}: IBookData) {
    return (
        <Link
            className="flex gap-4 px-4 py-8 border-b border-gray-300"
            href={`/book/${id}`}
        >
            <img className="w-20" src={coverImgUrl} alt={title} />
            <div>
                <div className="font-bold">{title}</div>
                <div className="break-keep">{subTitle}</div>
                <br />
                <div className="text-gray-500">
                    {author} | {publisher}
                </div>
            </div>
        </Link>
    );
}
