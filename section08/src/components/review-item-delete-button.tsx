'use client';

import deleteReviewAction from '@/actions/delete-review-action';
import { useActionState, useEffect, useRef } from 'react';

export default function ReviewItemDeleteButton({
    bookId,
    reviewId,
}: {
    bookId: number;
    reviewId: number;
}) {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction, isPending] = useActionState(
        deleteReviewAction,
        null,
    );

    useEffect(() => {
        if (state && !state.status) alert(state.error);
    }, [state]);
    return (
        <form ref={formRef} action={formAction}>
            <input type="hidden" name="bookId" value={bookId} />
            <input type="hidden" name="reviewId" value={reviewId} />
            {isPending ? (
                <div>...</div>
            ) : (
                <div onClick={() => formRef.current?.requestSubmit()}>
                    {/* button태그 없이 폼의 submit하는 법 */}
                    삭제하기
                </div>
            )}
        </form>
    );
}
