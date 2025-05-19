'use client';
import createReviewAction from '@/actions/create-review-action';
import { useActionState, useEffect } from 'react';

export default function ReviewEditor({ bookId }: { bookId: string }) {
    const [state, formAction, isPending] = useActionState(
        createReviewAction, //폼 제출 시 사용할 메서드를 인자로
        null, // "state"의 초기값
    );
    //state : createReviewAction()의 return값이 들어감
    //formAction : useActionState()의 첫번째 인자가 들어감. 즉 여기선 createReviewAction 그 자체
    //isPending : 현재 액션이 로딩중임을 나타냄 (true -> 로딩중)

    useEffect(() => {
        if (state && !state.status) alert(state.error);
    }, [state]);
    //state에 따른 alert창 여부 로직
    return (
        <section>
            <form className="flex flex-col gap-[5px]" action={formAction}>
                <input
                    className="p-[10px] box-border border border-[#dcdcdc] rounded-[5px]"
                    name="bookId"
                    type="hidden"
                    value={bookId}
                />
                <textarea
                    disabled={isPending}
                    // disabled와 isPending을 통한 로딩로직 추가
                    className="w-full h-[100px] resize-y p-[10px] box-border border border-[#dcdcdc] rounded-[5px]"
                    required
                    name="content"
                    placeholder="리뷰 내용"
                ></textarea>
                <div className="flex justify-end gap-[5px]">
                    <input
                        disabled={isPending}
                        // disabled와 isPending을 통한 로딩로직 추가
                        required
                        name="author"
                        placeholder="작성자"
                        className="p-[10px] box-border border border-[#dcdcdc] rounded-[5px]"
                    />
                    <button
                        disabled={isPending}
                        // disabled와 isPending을 통한 로딩로직 추가
                        className="w-20 p-[10px] bg-[#2593ff] text-white border-none rounded cursor-pointer"
                        type="submit"
                    >
                        {isPending ? '...' : '작성하기'}
                        {/* disabled와 isPending을 통한 로딩로직 추가 */}
                    </button>
                </div>
            </form>
        </section>
    );
}
