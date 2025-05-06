'use server';
//다른 컴포넌트로부터 분리한 함수라면, 함수 내부에 있던 'use server'를 최상단에 배치하는게 일반적

export default async function createReviewAction(formData: FormData) {
    //자바스크립트의 기본 내장 객체인 FormData를 사용
    //서버 액션을 사용하기 위해서는 반드시 'use server'를 선언해야 함
    //넥스트서버에서 직접 명령어를 실행할 수 있도록 해줌
    const bookId = formData.get('bookId')?.toString();
    const content = formData.get('content')?.toString();
    //이 get 메서드는 FormData 객체에서 특정 필드의 값을 가져오는 메서드
    //?.toString()은 string이 아닌 다른 타입(FormDataValue)일 경우를 대비한 안전한 변환 (단순히 string만을 원하니까)
    const author = formData.get('author')?.toString();

    if (!bookId || !content || !author) return;

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
            {
                method: 'POST',
                body: JSON.stringify({ bookId, content, author }),
            },
        );
        console.log(response.status);
    } catch (error) {
        console.error('리뷰 작성 중 에러 발생:', error);
        //에러가 발생했을 때 콘솔에 에러 메시지를 출력
        //이렇게 하면 서버에서 에러가 발생했을 때도 클라이언트에서 확인할 수 있음
    }
}
