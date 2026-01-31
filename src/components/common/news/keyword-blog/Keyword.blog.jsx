import React from "react";
import {
  StyledNewsDiv,
  StyledNewsKeyword,
  StyledNewsItemDiv,
  StyledNewsItemHeaderDiv,
  StyledNewsItemPatentDiv,
  StyledNewsItemContentDiv,
} from "./Keyword.style";

function timeAgo(dateString) {
  const now = new Date();

  const year = parseInt(dateString.slice(0, 4), 10);
  const month = parseInt(dateString.slice(4, 6), 10) - 1;
  const day = parseInt(dateString.slice(6, 8), 10);
  const hour = parseInt(dateString.slice(8, 10), 10);
  const minute = parseInt(dateString.slice(10, 12), 10);
  const second = parseInt(dateString.slice(12, 14), 10);

  const articleDate = new Date(year, month, day, hour, minute, second);
  const differenceInMilliseconds = now - articleDate;
  const differenceInHours = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60)
  );

  if (differenceInHours < 24) {
    return `${differenceInHours}시간 전`;
  } else {
    const differenceInDays = Math.floor(differenceInHours / 24);
    return `${differenceInDays}일 전`;
  }
}

const data = [
  {
    maxScore: 1,
    maxSentence:
      "덴마크가 삼양식품의 핵불닭볶음면 3×Spicy, 핵불닭볶음면 2×Spicy, 불닭볶음탕면을 리콜 조치키로 했다.",
    title: '"너무 매워서 위험하다" 덴마크서 리콜 조치된 이 라면',
    url: "https://n.news.naver.com/mnews/article/656/0000093645",
    date: "20240612",
    projectId: "ko.news",
    docId: "202406126560000093645",
    writer: "대전일보",
    documentDate: "20240612171700",
    highlight: ["불닭볶음탕면을"],
  },
  {
    maxScore: 1,
    maxSentence:
      "[이데일리 김보겸 기자] KB증권은 에스앤디(260970)에 대해 불닭볶음면 열풍으로 주요 고객사인 삼양식품(003230)과 동반 성장하고 있다고 평가했다.",
    title: "에스앤디, 불닭 열풍에 동반성장…동종업계 대비 저평가 -KB",
    url: "https://n.news.naver.com/mnews/article/018/0005762640",
    date: "20240613",
    projectId: "ko.news",
    docId: "202406130180005762640",
    writer: "이데일리",
    documentDate: "20240613081700",
    highlight: ["불닭볶음면"],
  },
  {
    maxScore: 1,
    maxSentence:
      "주요 종목 중에선 에스앤디(260970)가 불닭볶음면 소스 제조사라는 점이 부각하면서 상한가를 기록했다.",
    title: "[코스닥 마감]美 인플레 진정에 강보합…화장품株 강세",
    url: "https://n.news.naver.com/mnews/article/018/0005763136",
    date: "20240613",
    projectId: "ko.news",
    docId: "202406130180005763136",
    writer: "이데일리",
    documentDate: "20240613154700",
    highlight: ["불닭볶음면"],
  },
  {
    maxScore: 1,
    maxSentence:
      "- 불닭볶음면 2012년 출시…해외 인기에 삼양식품 매출↑ - 삼양식품, 올 1분기 매출 3857억·영업이익 801억 기록 - 1분기 매출 75% 해외 비중…중국·동남아·미주 순 판매 ◇?",
    title:
      "[김대호 박사의 오늘의 키워드] 점도표 날벼락·불닭면 리콜·임종룡 아전인수·상법 382조·삼겹살 배신",
    url: "https://n.news.naver.com/mnews/article/374/0000387711",
    date: "20240613",
    projectId: "ko.news",
    docId: "202406133740000387711",
    writer: "SBSBiz",
    documentDate: "20240613070100",
    highlight: ["불닭볶음면"],
  },
  {
    maxScore: 1,
    maxSentence:
      "마지막 이슈는 요즘 전세계에서 인기있는 K-푸드, 불닭볶음면 관련 소식입니다.",
    title: "[이슈 따라잡기] AI기대감 올라탄 애플, 시총 3조달러 재돌파",
    url: "https://n.news.naver.com/mnews/article/374/0000387810",
    date: "20240613",
    projectId: "ko.news",
    docId: "202406133740000387810",
    writer: "SBSBiz",
    documentDate: "20240613131000",
    highlight: ["불닭볶음면"],
  },
  {
    maxScore: 1,
    maxSentence:
      "남윤수가 여름에 딱 맞는 불닭냉라면과 대패삼겹돈가스를 세트 메뉴로 선보인 것.",
    title: "187.7cm 남윤수 피지컬 자랑→라면 먹방 (편스토랑)",
    url: "https://m.entertain.naver.com/now/article/382/0001131708",
    date: "20240613",
    projectId: "ko.news",
    docId: "202406133820001131708",
    writer: "스포츠동아",
    documentDate: "20240613155613",
    highlight: ["불닭냉라면과"],
  },
];

export default function KeywordNews() {
  // Sort data by documentDate in descending order
  const sortedData = data.sort(
    (a, b) => parseInt(b.documentDate) - parseInt(a.documentDate)
  );

  return (
    <StyledNewsDiv>
      <StyledNewsKeyword>
        <span>"불닭"</span>이 이렇게 언급됐어요
      </StyledNewsKeyword>
      <StyledNewsItemPatentDiv>
        {sortedData.map((e, index) => (
          <StyledNewsItemDiv key={index}>
            <a
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <StyledNewsItemHeaderDiv>
                <span>{e.writer}</span> | <span>{timeAgo(e.documentDate)}</span>
              </StyledNewsItemHeaderDiv>
              <div>{e.title}</div>
              <StyledNewsItemContentDiv>
                {e.maxSentence}
              </StyledNewsItemContentDiv>
            </a>
          </StyledNewsItemDiv>
        ))}
      </StyledNewsItemPatentDiv>
    </StyledNewsDiv>
  );
}
