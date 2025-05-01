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
    }, [error]);
    return (
        <div>
            <h3>오류가 발생했습니다.</h3>

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
