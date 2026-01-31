const googleTrends = require("google-trends-api");

async function fetchGoogleTrendsData(keyword) {
  try {
    const daysAgo = 7; // 원하는 날짜 수로 변경 가능
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);
    startDate.setHours(0, 0, 0, 0);
    console.log("날짜:", startDate);

    const data = await googleTrends.interestOverTime({
      keyword: keyword,
      startTime: new Date(startDate), // 시작 날짜 (유효한 날짜 문자열 또는 Date 객체여야 함)
      endTime: new Date(), // 현재 시간까지의 데이터를 가져옴
    });

    // 데이터 파싱 및 출력 (또는 필요한 처리 수행)
    console.log(
      keyword,
      "키워드의",
      startDate,
      "부터 현재까지의 구글 트렌드 데이터:"
    );
    console.log(data);

    // 필요시 파싱된 데이터 반환
    return data;
  } catch (error) {
    console.error("구글 트렌드 데이터를 가져오는 중 오류 발생:", error);
    throw error; // 오류를 호출자에게 전파
  }
}

// 예시 사용법:
const keyword = "삼성전자";

fetchGoogleTrendsData(keyword);
