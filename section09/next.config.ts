// 넥스트 앱의 옵션들을 설정해주는 파일
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    logging: {
        //fetch 결과를 콘솔에 찍어주는 옵션
        fetches: {
            fullUrl: true,
        },
    },
    images: {
        domains: ['shopping-phinf.pstatic.net'],
    },
    //next.js의 이미지 최적화 기능에서 허용되지 않은 도메인의 이미지를 렌더링할 수 없음
    //따라서 위와같이 특정 도메인의 이미지 렌더링을 허용하는 설정을 해주어야 함
};

export default nextConfig;
