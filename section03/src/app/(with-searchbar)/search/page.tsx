// 서버 컴포넌트 페이지라 async await가 가능
export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ q: string }>;
}) {
    // 쿼리스트링이나 URL 파라미터 등등을 props로 받아올 수 있음
    const { q } = await searchParams;
    console.log(searchParams);
    return <div>검색 페이지 : {q}</div>;
}
