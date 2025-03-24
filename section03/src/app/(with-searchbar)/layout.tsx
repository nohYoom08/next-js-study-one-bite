//해당 layout.tsx파일이 없었다면 /serach/page.tsx가 렌더링 됐음
//라우터 그룹의 경로로 들어와야지 해당 layout.tsx가 렌더링 됨 (Ex: 해당 layout은 /search 경로로 들어와야 렌더링 됨 but ./page.tsx는 렌더링되지 않음(/serach/page.tsx가 렌더링되야하니까))
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div>임시 서치바</div>
            {children}
        </div>
    );
}
