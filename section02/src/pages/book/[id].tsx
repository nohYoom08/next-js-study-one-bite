const mockData = {
    id: 1,
    title: '한 입 크기로 잘라 먹는 리액트',
    subTitle: '자바스크립트 기초부터 애플리케이션 배포까지',
    description:
        '자바스크립트 기초부터 애플리케이션 배포까지\n처음 시작하기 딱 좋은 리액트 입문서\n\n이 책은 웹 개발에서 가장 많이 사용하는 프레임워크인 리액트 사용 방법을 소개합니다. 인프런, 유데미에서 5000여 명이 수강한 베스트 강좌를 책으로 엮었습니다. 프런트엔드 개발을 희망하는 사람들을 위해 리액트의 기본을 익히고 다양한 앱을 구현하는 데 부족함이 없도록 만들었습니다. \n\n자바스크립트 기초 지식이 부족해 리액트 공부를 망설이는 분, 프런트엔드 개발을 희망하는 취준생으로 리액트가 처음인 분, 퍼블리셔나 백엔드에서 프런트엔드로 직군 전환을 꾀하거나 업무상 리액트가 필요한 분, 뷰, 스벨트 등 다른 프레임워크를 쓰고 있는데, 실용적인 리액트를 배우고 싶은 분, 신입 개발자이지만 자바스크립트나 리액트 기초가 부족한 분에게 유용할 것입니다.',
    author: '이정환',
    publisher: '프로그래밍인사이트',
    coverImgUrl:
        'https://shopping-phinf.pstatic.net/main_3888828/38888282618.20230913071643.jpg',
};

export default function Page() {
    const { id, title, subTitle, description, author, publisher, coverImgUrl } =
        mockData;
    return (
        <div>
            <div
                className={`relative flex justify-center p-5 bg-center bg-no-repeat bg-cover 
            before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:opacity-50 before:content-''`}
                style={{ backgroundImage: `url(${coverImgUrl})` }}
                // tailwindCSS에서 변수를 직접 사용할 때는 style태그를 직접 사용
            >
                <img className="z-1 h-full max-w-90 " src={coverImgUrl}></img>
            </div>
            <div className="flex flex-col gap-1">
                <div className="text-lg font-bold">{title}</div>
                <div className="text-gray-500">{subTitle}</div>
                <div className="text-gray-500">
                    {author} | {publisher}
                </div>
                <div className="bg-gray-100 p-4 leading-6 rounded-md whitespace-pre-line">
                    {description}
                </div>
            </div>
        </div>
    );
}

// 2.8 강의 전까지 백업본 코드
// import { useRouter } from 'next/router';

// export default function Page() {
//     const router = useRouter();
//     console.log(router);
//     const { id } = router.query;
//     //[id].tsx라고 파일명을 만든 결과

//     return <h1>Book {id}</h1>;
// }
