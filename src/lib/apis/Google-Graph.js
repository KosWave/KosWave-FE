import apiClient from "~/utils/axios";

//3. 검색어-연관키워드 검색량 가져오기 (google trends api)
export async function googleTrendsAPI(keyword) {
    try {
        console.log("googleTrendsAPI 백엔드 요청")
        const response = await apiClient.get("/api/trends/google", {
            params: {
              keyword: keyword,
              startTime: 30,
            },
          });
          console.log(response.data);
          return JSON.parse(response.data);
    }
    catch(error) {
        if (!keyword) {
            return res.status(400).json({ error: 'keyword is required' });
        }
        else {
            return false;
        }
    }
  }

