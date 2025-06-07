import { ReactNode, Suspense } from 'react';
import Searchbar from '../../components/searchbar';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <div>{new Date().toLocaleString()}</div>
            {/* 클라이언트 라우트 캐시를 확인하기 위한 작업 
            -> '/'에서 '/search'로 이동을 한다 하더라도 시간에 변화가 없음 
            -> 캐시가 잘 작동하고 있다는 것(요청이 일어나지 않음)
            다만 새로고침 시에는 브라우저 캐시 모두 삭제됨 => 시간 다시 업데이트*/}
            <Suspense fallback={<div>Loading...</div>}>
                <Searchbar />
            </Suspense>
            {/* SearchBar내의 useSearchParams는 클라이언트에서 실행되어야 하기 때문에 사전렌더링 과정에서 오류발생
          -> so 클라이언트 사이드에서만 실행되도록 Suspense라는 내장된 기능 활용(클라이언트 컴포넌트는 사전렌더링, 수화과정 둘다 실행되는데 여기서 사전렌더링을 빼는 것) */}
            {children}
        </div>
    );
}
