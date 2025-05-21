import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({
    children,
    sidebar, //@sidebar의 슬롯 페이지 컴포넌트를 props로 받음
    feed, //얘도 마찬가지
}: //사실상 children도 @children/page.tsx라고 생각하면 됨
//근데 패러렐을 여러개 추가하다보면 버그터져서 실시간 반영 안됨 -> 재 npm run dev작업 또는 .next폴더 삭제 작업 필요

// 다만 현재 경로가 /parallel/setting일 경우 sidebar의 인자로는 직전에 렌더링되던 컴포넌트가 들어오게 됨. 접속 순서가 중요해짐
// /parallel/setting -> /parallel/kick인 경우에는 화면에 텍스트 @feed/setting과 @sidebar/kick이 둘다 렌더링됨
// /parallel -> /parallel/kick인 경우에는 텍스트 @feed과 @sidebar/kick이 렌더링됨
// 즉, 이전의 페이지 상태가 중요한 것이므로 클라이언트 사이드 렌더링 방식의 라우팅을 사용해야함(Link, navigate 등)가 아닌,
// 단순히 새로고침 또는 url을 직접 입력하는 방식으로는 페러렐 라우팅 시도 시 404에러가 발생함.
// So 각 슬롯 폴더마다 default.tsx를 만들어서 각 슬롯 컴포넌트의 기본값을 설정해주어야 함 (children에 대한 default.tsx도 당연히 필요!)

//children에 대한 default.tsx??
//children은 slot에 해당되지 않는 page.tsx를 렌더링,
//so 슬롯 폴더 내 경로로 만들어진 page.tsx는 children으로 렌더링되는 것이 아닌 해당 슬롯명의 props(feed, sidebar 등)로 전달됨
//즉 children은 "기본 슬롯"인 느낌
{
    children: ReactNode;
    sidebar: ReactNode;
    feed: ReactNode;
}) {
    return (
        <div>
            <Link href="/parallel">parallel</Link>
            <br />
            <Link href="/parallel/setting">parallel/setting</Link>
            <br />
            <Link href="/parallel/kick">parallel/kick</Link>

            {feed}
            {sidebar}
            {/* 이렇게 여러 페이지(슬롯 컴포넌트)를 하나의 레이아웃에서 표시하는걸 페러렐 라우팅이라고 함 */}
            {children}
        </div>
    );
}
