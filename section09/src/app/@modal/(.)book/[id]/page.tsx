// (.)book/[id]
// => (.) : 동일한 경로 (.은 경로의 의미, so 상위경로일 때는 ..을 사용해야 할 것)
// => book/[id] : book/[id]의 page.tsx를 인터셉트 하겠다.
// => 동일한 경로에 있는 book/[id]의 page.tsx를 인터셉트 하겠다.
import BookPage from '@/app/book/[id]/page';
import Modal from '@/components/modal';

export default function Page(props: any) {
    // props에는 book/[id]/page.tsx에서 전달한 props가 들어온다.
    return (
        <Modal>
            <BookPage {...props}></BookPage>
        </Modal>
        /* BookPage 컴포넌트에 props를 전달하여 렌더링 */
    );
}
