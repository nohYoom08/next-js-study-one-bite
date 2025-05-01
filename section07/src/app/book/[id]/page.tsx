import { notFound } from 'next/navigation';
import style from './page.module.css';

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

function ReviewEditor() {
    async function createReviewAction(formData: FormData) {
        //자바스크립트의 기본 내장 객체인 FormData를 사용
        'use server';
        //서버 액션을 사용하기 위해서는 반드시 'use server'를 선언해야 함
        //넥스트서버에서 직접 명령어를 실행할 수 있도록 해줌
        console.log('서버액션 테스트 : formData', formData);
        const content = formData.get('content')?.toString();
        //이 get 메서드는 FormData 객체에서 특정 필드의 값을 가져오는 메서드
        //?.toString()은 string이 아닌 다른 타입(FormDataValue)일 경우를 대비한 안전한 변환 (단순히 string만을 원하니까)
        const author = formData.get('author')?.toString();

        console.log('content', content);
        console.log('author', author);
    }

    return (
        <section>
            <form action={createReviewAction}>
                <input name="content" placeholder="리뷰 내용"></input>
                <input name="author" placeholder="작성자"></input>
                <button type="submit">작성하기</button>
            </form>
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
            <ReviewEditor />
        </div>
    );
}
