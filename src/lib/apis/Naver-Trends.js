import apiClient from "~/utils/axios";


export async function fetchNaverStockData(
    keywords,
    startDate,
    endDate,
    periodOffset,
    setLoadError
  ) {
    setLoadError(false);
    const response = await apiClient.post("/api/trends/naver", {
      keywords,
      startDate,
      endDate,
      periodOffset,
    });
    return response.data;
  };