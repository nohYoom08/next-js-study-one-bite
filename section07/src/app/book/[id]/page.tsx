import { notFound } from 'next/navigation';
import style from './page.module.css';
import { ReviewData } from '@/types';
import ReviewItem from '@/components/review-item';
import ReviewEditor from '@/components/review-editor';

//아래의 미리 설정해둔 params가 아니면 무조건 404에러가 발생 (설령 db에 있다 하더라도)
// export const dynamicParams = false;

//라우트 세그먼트 옵션
//페이지 라우팅의 getStaticPaths()과 동일한 기능, 미리 정의된 id값을 기반으로 정적 페이지를 생성하는 함수
export function generateStaticParams() {
    return [
        {
            id: '1',
            //다만 속성값은 항상 문자열로 작성
        },
        {
            id: '2',
        },
        {
            id: '3',
        },
    ];
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
                <img src={coverImgUrl} />
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
