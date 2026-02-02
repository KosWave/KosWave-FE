import React, { useEffect } from "react";
import {
  StyledNewsDiv,
  StyledNewsKeyword,
  StyledNewsItemDiv,
  StyledNewsItemHeaderDiv,
  StyledNewsItemPatentDiv,
  StyledNewsItemContentDiv,
  StyledContentsDiv,
} from "./Naver.style";

import { StyledBlurDiv } from "./Naver.style";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import apiClient from "~/utils/axios";
import { isNullOrUndef } from "chart.js/helpers";
import Skeleton from "react-loading-skeleton";

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
  const differenceInMinutes = Math.floor(
    differenceInMilliseconds / (1000 * 60)
  );

  if (differenceInMinutes < 1) {
    return "방금";
  } else if (differenceInMinutes < 60) {
    return `${differenceInMinutes}분 전`;
  } else {
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    if (differenceInHours < 24) {
      return `${differenceInHours}시간 전`;
    } else {
      const differenceInDays = Math.floor(differenceInHours / 24);
      return `${differenceInDays}일 전`;
    }
  }
}

const highlightColor = "#ff6347";

function highlightedText(text, highlights) {
  let highlighted = text;
  highlights.forEach((highlight) => {
    highlighted = highlighted
      .split(highlight)
      .join(`<span style="color: ${highlightColor}">${highlight}</span>`);
  });
  return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
}

const fetchNaverNews = async (keyword, props) => {
  props.setLoadError(false);

  try {
    // 1. 백엔드 호출
    const response = await apiClient.get("/api/news/naver", {
      params: { keyword: keyword }
    });

    // 2. 응답 데이터 확인 (배열인지 확인)
    // response.data가 바로 [ {...}, {...} ] 배열인 상황입니다.
    const newsItems = response.data;

    if (!Array.isArray(newsItems)) return [];

    // 3. 데이터 매핑
    const mappedData = newsItems.map((item) => {
      // 날짜 변환: "Thu, 27 Nov 2025 13:42:00 +0900" -> "20251127134200"
      const d = new Date(item.pubDate);
      const formattedDate = [
        d.getFullYear(),
        ('0' + (d.getMonth() + 1)).slice(-2),
        ('0' + d.getDate()).slice(-2),
        ('0' + d.getHours()).slice(-2),
        ('0' + d.getMinutes()).slice(-2),
        ('0' + d.getSeconds()).slice(-2)
      ].join('');

      return {
        url: item.link,
        writer: "네이버 뉴스", 
        documentDate: formattedDate, // timeAgo 함수가 요구하는 14자리 포맷
        title: item.title.replace(/<[^>]*>?/gm, ''), // <b> 태그 제거
        maxSentence: item.description.replace(/<[^>]*>?/gm, ''), // <b> 태그 제거
        highlight: [keyword] 
      };
    });

    return mappedData;
  } catch (err) {
    console.error("뉴스 로딩 에러:", err);
    props.setLoadError(true);
    throw err;
  }
};

export default function NaverNews(props) {
  const keyword = useSelector((state) => state.keyword.keyword);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const {
    data = [],
    isLoading,
  } = useQuery(["naverNews", keyword], () => fetchNaverNews(keyword, props), {
    enabled: !!keyword,
    staleTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && data.length === 0) {
      props.setLoadError(true);
    } else props.setLoadError(false);
  }, [isLoading, data, props.loadError]);

  return (
    <StyledNewsDiv darkMode={darkMode}>
      <StyledNewsKeyword darkMode={darkMode}>
        <span>{`"${keyword}"`}</span>이(가) 이렇게 언급됐어요
      </StyledNewsKeyword>
      <StyledNewsItemPatentDiv isscroll={props.isscroll}>
        {isLoading || !data ? (
          Array.from({ length: 20 }).map((_, index) => (
            <StyledContentsDiv key={index}>
              <Skeleton height={20} />
              <Skeleton height={15} />
              <Skeleton height={15} width="75%" />
            </StyledContentsDiv>
          ))
        ) : (
          <>
            {data.map((e, index) => (
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <StyledNewsItemDiv
                  key={index}
                  Hfontsize={props.Hfontsize}
                  darkMode={darkMode}
                >
                  <StyledNewsItemHeaderDiv darkMode={darkMode}>
                    <img src="/assets/images/blog.png" />
                    <span>{e.writer}</span> |{" "}
                    <span>{timeAgo(e.documentDate)}</span>
                  </StyledNewsItemHeaderDiv>
                  <div>{e.title}</div>
                  <StyledNewsItemContentDiv
                    Cfontsize={props.Cfontsize}
                    darkMode={darkMode}
                  >
                    {highlightedText(e.maxSentence, e.highlight)}
                  </StyledNewsItemContentDiv>
                </StyledNewsItemDiv>
              </a>
            ))}
          </>
        )}
      </StyledNewsItemPatentDiv>
      <StyledBlurDiv darkMode={darkMode}></StyledBlurDiv>
    </StyledNewsDiv>
  );
}
