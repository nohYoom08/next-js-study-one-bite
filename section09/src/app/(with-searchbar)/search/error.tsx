//error.tsx는 하위경로까지 전부 적용됨
//특정 하위 경로에 다른 에러 페이지를 적용하고 싶다면 해당 파일과 같이 해당 경로에다가도 error.tsx를 만들어주면 됨
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
    }, [error]);
    return (
        <div>
            <h3>검색과정에서 오류가 발생했습니다.</h3>
            {/* <button onClick={() => reset()}>다시 시도</button> */}

            <button
                onClick={() => {
                    startTransition(() => {
                        router.refresh();
                        reset();
                    });
                }}
            >
                다시 시도
            </button>
        </div>
    );
}
