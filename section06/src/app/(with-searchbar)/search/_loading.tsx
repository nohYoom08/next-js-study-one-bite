//스트리밍을 제공하는 컴포넌트(loading.tsx라는 이름으로 자동적용) => 로딩 중일 때 보여줄 내용을 정의
// '/search'아래의 모든 async page.tsx 컴포넌트에서 사용 (layout.tsx나 기타 컴포넌트 파일에는 적용 안 됨)
// 페이지 이동이 아닌 쿼리스트링의 이동만 있을 경우에는 작동하지 않음
// ex: '/' -> '/search'같은 경우에는 로딩창 발생 But '/search?q=책' -> '/search?q=책2' 같은 경우에는 로딩창 발생 안 함
export default function Loading() {
    return <div>로딩 중입니다...</div>;
}
