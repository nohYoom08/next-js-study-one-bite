import { IBookData } from '@/types';

export default async function fetchOneBook(
    id: number,
): Promise<IBookData | null> {
    const url = `http://localhost:12345/book/${id}`;
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
