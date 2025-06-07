import { ReviewData } from '@/types';
import ReviewItemDeleteButton from './review-item-delete-button';

export default function ReviewItem({
    id,
    content,
    author,
    createdAt,
    bookId,
}: ReviewData) {
    return (
        <div className="flex flex-col gap-[5px] py-[15px] px-0">
            <div className="text-sm">{author}</div>
            <div className="bg-[#f0f0f0] px-[10px] py-[15px] rounded-[5px]">
                {content}
            </div>
            <div className="flex gap-[10px] text-gray-500 text-sm cursor-pointer">
                <div>{new Date(createdAt).toLocaleString()}</div>
                <ReviewItemDeleteButton reviewId={id} bookId={bookId} />
            </div>
        </div>
    );
}
