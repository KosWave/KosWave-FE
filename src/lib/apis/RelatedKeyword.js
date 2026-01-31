import axios from "axios";

const BASE_URL = "/api/keyword";
const service = axios.create({
  baseURL: BASE_URL,
});

//1. 연관키워드 가져오기
export async function relatedKeywordAPI({ keyword }) {
  try {
    const resp = await service.post("/", {
      keyword: keyword,
    });
    return resp.data;
  } catch (error) {
    throw error;
  }
}

//2. 검색어-연관키워드 관련 뉴스 가져오기
export async function relatedNewsAPI({ exWord, keyword }) {
  try {
    console.log("FE->BE 연관키워드 API 요청 수행");

    const resp = await service.post("/news", {
      exWord: exWord,
      keyword: keyword,
    });
    return resp.data;
  } catch (error) {
    throw error;
  }
}
