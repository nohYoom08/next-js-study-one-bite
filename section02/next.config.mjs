// 📌 Next.js의 설정 파일 (ES Module 방식 사용)
// `next.config.mjs`는 Next.js의 설정을 정의하는 파일로, 프로젝트의 동작을 커스터마이징할 수 있음.
// `.mjs` 확장자는 ES Module 형식임을 의미하며, `export default`를 사용하여 설정을 내보냄.

/** @type {import('next').NextConfig} */
// 📌 Next.js에서 제공하는 타입 지원 (TypeScript 없이도 자동 완성 기능을 사용할 수 있도록 도와줌)
const nextConfig = {
    reactStrictMode: false, // 🔥 React의 Strict Mode 활성화 (개발 중 불필요한 렌더링 감지 및 경고 제공)
};

export default nextConfig; // 📌 ES Module 방식으로 설정 내보내기 (CommonJS 방식에서는 `module.exports = nextConfig` 사용)
