import axios from "axios";

// 환경 변수에서 API base URL 가져오기
// 개발 환경에서는 proxy를 사용하고, 프로덕션에서는 환경 변수 사용
const getApiBaseUrl = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  
  // 환경 변수가 설정되어 있으면 사용, 없으면 상대 경로 (개발 환경에서 proxy 사용)
  if (apiBaseUrl) {
    // URL에 프로토콜이 없으면 추가
    if (!apiBaseUrl.startsWith("http://") && !apiBaseUrl.startsWith("https://")) {
      return `https://${apiBaseUrl}`;
    }
    return apiBaseUrl;
  }
  
  // 개발 환경에서는 proxy를 사용하므로 상대 경로 반환
  return "";
};

// 공통 axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
