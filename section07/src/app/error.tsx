//기본적인 에러 페이지 (넥스트에서 제공하는)

//error.tsx는 page.tsx의 경우 하위 경로의 모든 page.tsx에 적용되지만, layout.tsx의 경우에는 같은 계층에만 적용됨
//따라서 /app/error.tsx 뿐만 아니라 서치바의 오류 처리도 하고싶다면 /app/(with-searchbar)/error.tsx도 작성해주어야 함
'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    const router = useRouter();
    useEffect(() => {
        console.log('error', error.message);
        //메세지만 깔끔하게 출력
    }, [error]);
    return (
        <div>
            <h3>오류가 발생했습니다.</h3>
            {/* <button onClick={() => reset()}>다시 시도</button> */}

            <button
                onClick={() => {
                    startTransition(() => {
                        router.refresh(); // 서버 컴포넌트만 업데이트
                        reset(); //클라이언트 사이드 리렌더링 (router.refresh()이후 남아있던 에러 컴포넌트들 초기화)})
                    });
                    //router.refresh()가 동작한 뒤에 reset()이 동작해야 함
                    //그래야 에러가 발생한 컴포넌트들이 초기화됨
                    //그런데 router.refresh()는 비동기작업이어서 reset()이 먼저 실행될 가능성이 높음
                    //그래서 startTransition()을 사용해서 두 작업이 한꺼번에 일괄적으로 처리되도록 함
                }}
            >
                다시 시도
            </button>
            {/* 에러가 발생했을 때 다시 시도할 수 있는 버튼 */}
        </div>
    );
}
