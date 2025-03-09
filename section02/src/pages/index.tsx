import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import books from '@/mock/books.json';
import BookItem from '@/components/book-item';

// ✅ 재사용 가능한 제목 컴포넌트 -> 한 컴포넌트 내에서 Tailwind CSS가 중복된다면 이런 방식도 고려
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-bold text-lg">{children}</h3>
);

export default function Home() {
    return (
        <div className="flex-col">
            <section>
                <SectionTitle>지금 추천하는 도서</SectionTitle>
                {books.map(item => (
                    <BookItem key={item.id} {...item} />
                ))}
            </section>
            <section>
                <SectionTitle>등록된 모든 도서</SectionTitle>
                {books.map(item => (
                    <BookItem key={item.id} {...item} />
                ))}
            </section>
        </div>
    );
}

Home.getLayout = (page: ReactNode) => (
    <SearchableLayout>{page}</SearchableLayout>
);
// page컴포넌트를 인수로 전달하면 SearchableLayout컴포넌트의 children으로 전달되어 렌더링됨
// 자바스크립트 함수는 애초에 객체이므로, Home함수의 프로퍼티 중 getLayout이라는 속성(메서드)의 속성값을 설정하는 것 (= 메서드 추가)
