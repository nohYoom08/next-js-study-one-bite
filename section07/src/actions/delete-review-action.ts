'use server';

import { revalidateTag } from 'next/cache';

export default async function deleteReviewAction(_: any, formData: FormData) {
    const reviewId = formData.get('reviewId')?.toString();
    const bookId = formData.get('bookId')?.toString();

    if (!reviewId) return { status: false, error: '리뷰 ID를 입력해주세요.' };

    try {
        const resposne = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
            { method: 'DELETE' },
        );
        if (!resposne.ok) {
            throw new Error(resposne.statusText);
        }
        revalidateTag(`review-${bookId}`);
        //리뷰 삭제 후, 해당 책의 리뷰 목록(with bookId)을 재검증하여 최신 상태로 업데이트
        return { status: true, error: '' };
    } catch (error) {
        return {
            status: false,
            error: '리뷰 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.',
        };
    }
}
