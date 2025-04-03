import { ReactNode, Suspense } from 'react';
import Searchbar from '../../components/searchbar';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            {/* SearchBar내의 useSearchParams는 클라이언트에서 실행되어야 하기 때문에 사전렌더링 과정에서 오류발생
          -> so 클라이언트 사이드에서만 실행되도록 Suspense라는 내장된 기능 활용(클라이언트 컴포넌트는 사전렌더링, 수화과정 둘다 실행되는데 여기서 사전렌더링을 빼는 것) */}
            <Suspense fallback={<div>Loading...</div>}>
                <Searchbar />
            </Suspense>
            {children}
        </div>
    );
}
