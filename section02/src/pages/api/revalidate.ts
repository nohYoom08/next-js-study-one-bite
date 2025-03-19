import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        await res.revalidate('/'); //ISR을 통해 페이지 재생성 (이것이 "경로 재검증")
        return res.json({ revalidate: true });
    } catch (error) {
        res.status(500).send(error);
        //res.status(500) -> revalidate가 실패했음을 알려줌
    }
}
//외부 tsx파일에서 'fetch('/api/revalidate')'로 호출하는 것
//게시글을 수정할 떄는 fetch([백엔드 api주소])를 통해 백엔드 서버에 요청을 보내고, 이후 fetch('/api/revalidate')를 통해서 revalidate메서드를 호출, ISR를 통해 페이지 재생성
//localhost:3000/api/revalidate 접속을 통해서도 호출 및 페이지 재생성('/') 가능
