// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    res.status(200).json({ name: 'John Doe' });
}

// 이 파일은 Next.js의 API Routes 기능을 활용한 서버리스 API 엔드포인트
// 페이지가 아닌 API Routes의 한 기능으로서 작동
// /api/hello 경로로 API URI가 설정됨
// GET 요청이 오면 { name: "John Doe" }를 JSON 형태로 응답
// TypeScript의 NextApiRequest, NextApiResponse를 사용하여 타입 안정성을 제공
// https://nextjs.org/docs/pages/building-your-application/routing/api-routes 공식문서링크
