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
};

export default nextConfig;
