//like 페이지라우팅 방식 => 옵셔널(대괄호 두 개) 캐치올(...) 세그먼트
export default async function Page({
    params,
}: {
    params: Promise<{ caid: string }>;
}) {
    const { caid } = await params;
    return <div>book/{caid}페이지</div>;
}
