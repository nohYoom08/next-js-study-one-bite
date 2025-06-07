'use server';

import { revalidateTag } from 'next/cache';

//다른 컴포넌트로부터 분리한 함수라면, 함수 내부에 있던 'use server'를 최상단에 배치하는게 일반적

export default async function createReviewAction(_: any, formData: FormData) {
    //_는 사용하지 않는 인자라는 의미, useActionState()의 state를 임시로 받기 위한 것

    //자바스크립트의 기본 내장 객체인 FormData를 사용
    //서버 액션을 사용하기 위해서는 반드시 'use server'를 선언해야 함
    //넥스트서버에서 직접 명령어를 실행할 수 있도록 해줌
    const bookId = formData.get('bookId')?.toString();
    const content = formData.get('content')?.toString();
    //이 get 메서드는 FormData 객체에서 특정 필드의 값을 가져오는 메서드
    //?.toString()은 string이 아닌 다른 타입(FormDataValue)일 경우를 대비한 안전한 변환 (단순히 string만을 원하니까)
    const author = formData.get('author')?.toString();

    if (!bookId || !content || !author)
        return { status: false, error: '리뷰 내용과 작성자를 입력해주세요.' };

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review1`,
            {
                method: 'POST',
                body: JSON.stringify({ bookId, content, author }),
            },
        );
        console.log(response.status);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        //1. 특정 주소에 해당하는 페이지만 재검증
        // revalidatePath(`/book/${bookId}`);
        //리뷰 작성 후, 해당 책의 상세 페이지를 재검증하여 최신 상태로 업데이트
        // => 해당 페이지의 fetch관련 캐시들 전부 삭제 후 재업데이트
        // => 풀라우트 캐시까지 삭제됨
        //서버 액션 및 서버 컴포넌트에서만 사용 가능

        //2. 특정 경로의 모든 동적 페이지를 재검증
        // revalidatePath('/book/[id]', 'page');
        //모든 책 상세 페이지를 재검증하게 됨

        //3. 특정 레이아웃의 모든 페이지 재검증
        // revalidatePath('/(with-searchbar)', 'layout');

        //4. 모든 페이지 재검증
        // revalidatePath('/', 'layout');
        //모든 페이지를 재검증하게 됨

        //5. 태그 기준, 데이터 캐시 재검증
        revalidateTag(`review-${bookId}`);
        //fetch의 캐시 옵션에서 tag를 사용한 경우, 해당 tag의 캐시를 재검증
        // => 특정 fetch 요청에 대해서만 캐시를 재검증
        // => 효율적
        // const response = await fetch(
        //     `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
        //     { next: { tags: [`review-${bookId}`] } }, <= 이렇게 작성한 경우
        // );
        return { status: true, error: '' };
        //상위 컴포넌트의 useActionState()의 state에 들어감
    } catch (error) {
        console.error('리뷰 작성 중 에러 발생:', error);
        //에러가 발생했을 때 콘솔에 에러 메시지를 출력
        //이렇게 하면 서버에서 에러가 발생했을 때도 클라이언트에서 확인할 수 있음
        return { status: false, error: '리뷰 작성에 실패하였습니다.' };
        //상위 컴포넌트의 useActionState()의 state에 들어감
    }
}
