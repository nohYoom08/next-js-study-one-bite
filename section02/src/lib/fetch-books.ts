import { IBookData } from '@/types';

export default async function fetchBooks(q?: string): Promise<IBookData[]> {
    let url = 'http://localhost:12345/book';

    if (q) {
        url += `/search?q=${q}`;
    }
    //하나의 함수로 쿼리 추가하는 법

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
