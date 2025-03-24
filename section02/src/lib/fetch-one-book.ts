import { IBookData } from '@/types';

export default async function fetchOneBook(
    id: number,
): Promise<IBookData | null> {
    const url = `${process.env.NEXT_PUBLIC_BACK_API}/book/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('서버 오류');
        }
        return await response.json();
    } catch (error) {
        console.log('error', error);
        return null;
    }
}
