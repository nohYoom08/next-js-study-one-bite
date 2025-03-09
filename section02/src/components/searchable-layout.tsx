import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

export default function SearchableLayout({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();
    const q = router.query.q;
    const [search, setSearch] = useState('');
    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value);
    };
    const onSubmitSearch = () => {
        if (!search || q === search) return;
        router.push(`/search?q=${search}`);
    };
    const onClickSearch = () => {
        onSubmitSearch();
    };
    const onKeyDownSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') onSubmitSearch();
    };

    useEffect(() => {
        setSearch(q as string);
        // q는 단순히 문자열이 올 수도 있고, 문자열 배열이 올 수도 있음
        // so, q가 문자열이 아닌 경우를 대비하여 타입 단언을 사용
    }, [q]);
    return (
        <div>
            <div className="flex gap-3 mb-5">
                <input
                    className="flex-1 p-4 rounded-sm border border-gray-300"
                    value={search}
                    onKeyDown={onKeyDownSearch}
                    onChange={onChangeSearch}
                    placeholder="검색어를 입력해주세요"
                ></input>
                <button
                    className={`w-20 rounded-sm bg-blue-400 text-white cursor-pointer
                        hover:bg-blue-500`}
                    //이런 식의 템플릿 리터럴 가능
                    onClick={onClickSearch}
                >
                    검색
                </button>
            </div>
            {children}
        </div>
    );
}
