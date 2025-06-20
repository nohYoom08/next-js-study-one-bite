import { notFound } from 'next/navigation';
import style from './page.module.css';
import { BookData, ReviewData } from '@/types';
import ReviewItem from '@/components/review-item';
import ReviewEditor from '@/components/review-editor';
import Image from 'next/image';
import { Metadata } from 'next';

//아래의 미리 설정해둔 params가 아니면 무조건 404에러가 발생 (설령 db에 있다 하더라도)
// export const dynamicParams = false;

//동적으로 메타태그를 설정하는데, 아래와 같이 직접 fetch통신도 시도할 수 있음
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id?: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
    );
    if (!response.ok) throw new Error(response.statusText);
    //근데 아래의 페이지 컴포넌트와 중복 통신이 발생하지 않나?
    //-> No. request memoization을 통해서 중복 통신이 발생하지 않도록 최적화되어 있음

    const book: BookData = await response.json();
    return {
        title: book ? `${book.title} - 한입 북스` : '한입 북스',
        description: book
            ? `${book.description}`
            : '한입 북스에 등록된 도서를 만나보세요.',
        openGraph: {
            title: book ? `${book.title} - 한입 북스` : '한입 북스',
            description: id
                ? `${book.description}`
                : '한입 북스에 등록된 도서를 만나보세요.',
            images: [book.coverImgUrl || '/thumbnail.png'],
        },
    };
}

// //라우트 세그먼트 옵션
// //페이지 라우팅의 getStaticPaths()과 동일한 기능, 미리 정의된 id값을 기반으로 정적 페이지를 생성하는 함수
// export function generateStaticParams() {
//     return [
//         {
//             id: '1',
//             //다만 속성값은 항상 문자열로 작성
//         },
//         {
//             id: '2',
//         },
//         {
//             id: '3',
//         },
//     ];
// // "generateStaticParams()" => 말 그대로 해당 페이지 컴포넌트의 props인 params객체로 return값들이 들어가게 된다는 것.
// // 이 함수는 빌드 시점에 실행되어서, 미리 정의된 id값을 기반으로 배열 요소 하나하나의 params.id로서 정적 페이지를 생성함
// }

export async function generateStaticParams() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    );
    if (!response.ok) throw new Error(response.statusText);
    const books: BookData[] = await response.json();

    return books?.map((book: BookData) => ({
        id: book.id.toString(),
    }));
    //books의 id값을 기반으로 정적 페이지를 생성하는 함수
    //이렇게 하면 빌드 시점에 books의 id값을 기반으로 모든 id에 대한 정적 페이지를 생성함
}

async function BookDetail({ bookId }: { bookId: string }) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
    );
    if (response.status === 404) {
        notFound();
        //404에러가 발생했을 때 페이지를 찾을 수 없다는 페이지로 이동
    }
    if (!response.ok) return <div>에러가 발생했습니다.</div>;

    const book = await response.json();
    const { id, title, subTitle, description, author, publisher, coverImgUrl } =
        book;

    return (
        <section>
            <div
                className={style.cover_img_container}
                style={{ backgroundImage: `url('${coverImgUrl}')` }}
            >
                <Image alt="" src={coverImgUrl} />
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>
                {author} | {publisher}
            </div>
            <div className={style.description}>{description}</div>
        </section>
    );
}

async function ReviewList({ bookId }: { bookId: string }) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
        { next: { tags: [`review-${bookId}`] } },
    );
    if (!response.ok)
        throw new Error(`ReviewList fetch error : ${response.status}`);
    //error.tsx를 사용하기 위한 에러 throw

    const reviews: ReviewData[] = await response.json();

    return (
        <section>
            {reviews.map(item => (
                <ReviewItem key={item.id} {...item} />
            ))}
        </section>
    );
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <div className={style.container}>
            <BookDetail bookId={(await params).id} />
            <ReviewEditor bookId={(await params).id} />
            <ReviewList bookId={(await params).id} />
        </div>
    );
}
