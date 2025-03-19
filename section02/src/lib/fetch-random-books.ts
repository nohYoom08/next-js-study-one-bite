import { IBookData } from '@/types';

export default async function fetchRandomBooks(): Promise<IBookData[]> {
    const url = 'http://localhost:12345/book/random';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('서버 오류');
        }
        return await response.json();
    } catch (error) {
        console.log('error', error);
        return [];
    }
}
