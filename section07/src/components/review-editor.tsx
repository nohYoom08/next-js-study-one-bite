import createReviewAction from '@/actions/create-review-action';

export default function ReviewEditor({ bookId }: { bookId: string }) {
    return (
        <section>
            <form
                className="flex flex-col gap-[5px]"
                action={createReviewAction}
            >
                <input
                    className="p-[10px] box-border border border-[#dcdcdc] rounded-[5px]"
                    name="bookId"
                    type="hidden"
                    value={bookId}
                />
                <textarea
                    className="w-full h-[100px] resize-y p-[10px] box-border border border-[#dcdcdc] rounded-[5px]"
                    required
                    name="content"
                    placeholder="리뷰 내용"
                ></textarea>
                <div className="flex justify-end gap-[5px]">
                    <input
                        required
                        name="author"
                        placeholder="작성자"
                        className="p-[10px] box-border border border-[#dcdcdc] rounded-[5px]"
                    />
                    <button
                        className="w-20 p-[10px] bg-[#2593ff] text-white border-none rounded cursor-pointer"
                        type="submit"
                    >
                        작성하기
                    </button>
                </div>
            </form>
        </section>
    );
}
