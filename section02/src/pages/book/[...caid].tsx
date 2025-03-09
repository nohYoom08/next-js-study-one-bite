import { useRouter } from 'next/router';

export default function Page() {
    const router = useRouter();
    const { caid } = router.query;
    // [...caid].tsx => catch all segment (모든 세그먼트를 포함 => /book/123/4/23/456과 같이 여러 단위의 세그먼트 포함 가능)
    // 여러개의 세그먼트일 경우 caid는 배열로 전달됨

    // 단, 단순히 /book 등 뒤에 아무런 세그먼트가 오지 않으면 오류 발생
    // 이 때는 index.ts를 따로 만들어주거나
    // [[...caid]].tsx를 해주면 세그먼트가 없든 한개든 여러개든 모든 경우에 따른 페이지를 라우팅할 수 있게 됨  => optional catch all segment

    return <h1>Book {caid}</h1>;
}
