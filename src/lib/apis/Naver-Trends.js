import axios from "axios";


export async function fetchNaverStockData(
    keywords,
    startDate,
    endDate,
    periodOffset,
    setLoadError
  ) {
    setLoadError(false);
    const response = await axios.post("/api/trends/naver", {
      keywords,
      startDate,
      endDate,
      periodOffset,
    });
    return response.data;
  };