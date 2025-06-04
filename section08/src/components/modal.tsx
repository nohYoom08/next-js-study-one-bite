'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';

import { createPortal } from 'react-dom';
// ➤ createPortal은 React DOM 외부의 DOM 노드에 컴포넌트를 렌더링할 수 있게 해줌
//    모달, 툴팁, 드롭다운 등 오버레이 UI를 만들 때 자주 사용됨

export default function Modal({ children }: { children: ReactNode }) {
    //    이 컴포넌트는 모달 콘텐츠를 렌더링하는 역할을 합니다

    const dialogRef = useRef<HTMLDialogElement>(null);
    const router = useRouter();

    const onKeyDownClose = (e: React.KeyboardEvent<HTMLDialogElement>) => {
        if (e.key === 'Escape') {
            // ➤ Escape 키를 누르면 모달을 닫고 이전 페이지로 이동
            dialogRef.current?.close();
            router.back();
        }
    };
    const onClickClose = (e: React.MouseEvent<HTMLDialogElement>) => {
        if ((e.target as any).nodeName === 'DIALOG') {
            // ➤ 모달 외부를 클릭을 의미
            // target에 대한 타입이 제공되지 않고 있어서 일단은 any로 처리
            dialogRef.current?.close();
            router.back();
        }
    };
    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
            dialogRef.current?.scrollTo({ top: 0 });
        }
    }, []);
    //dialog는 기본적으로 닫힌 상태로 렌더링되므로
    //컴포넌트가 마운트될 때 무조건 모달을 열 수 있도록 하고  스크롤을 맨 위로 이동

    return createPortal(
        // ➤ createPortal을 사용하여 모달 콘텐츠를 별도 DOM 위치에 렌더링 (전역으로)

        <dialog
            className="w-[80%] max-w-[500px] mt-5 rounded border-0 mx-auto my-0 px-4 py-4"
            ref={dialogRef}
            onKeyDown={onKeyDownClose}
            onClick={onClickClose}
        >
            {children}
        </dialog>,
        // ➤ HTML5 <dialog> 태그를 사용해 모달 구조를 정의합니다
        //    props로 받은 children이 이 안에 렌더링됩니다

        document.getElementById('modal-root') as HTMLElement,
        // 포털을 붙일 대상 DOM 요소를 지정 (예: public/index.html 또는 루트 layout.tsx에 <div id="modal-root" /> 존재해야 함)
        // 타입 단언(as HTMLElement)은 TypeScript가 null이 아님을 확신하게끔 함
    );
}
