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
import axios from "axios";
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
  const today = new Date();
  const endDate = today.toISOString().slice(0, 10).replace(/-/g, "");
  const startDate = new Date(today.setDate(today.getDate() - 7))
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");

  const result = await axios.post("/api/news/naver", {
    analysisMonths: 0,
    categorySetName: "TSN",
    endDate: endDate,
    ex: null,
    excludeRT: false,
    excludeWordOperators: "||",
    includeWordOperators: "||",
    keyword: keyword,
    keywordFilterExcludes: null,
    keywordFilterIncludes: null,
    period: 0,
    scoringKeyword: keyword,
    sources: "blog,news",
    startDate: startDate,
    synonym: null,
    topN: 500,
  });
  return result.data;
};

export default function NaverNews(props) {
  const keyword = useSelector((state) => state.keyword.keyword);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const {
    data = [],
    error,
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
