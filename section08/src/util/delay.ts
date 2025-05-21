export default async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// 단순 딜레이 함수
