import React, { useEffect } from "react";
import { StyledNewsKeyword } from "./Youtube.data.style";
import {
  StyledNewsDiv,
  StyledImageDiv,
  StyledNewsItemParentDiv,
  StyledNewsItemDiv,
  StyledNewsItemHeaderDiv,
  StyledVideoDiv,
  StyledContentsDiv,
} from "./Youtube.data.style";
import { timeAgo } from "~/utils/utils";
import { StyledBlurDiv } from "./Youtube.data.style";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import apiClient from "~/utils/axios";
import Skeleton from "react-loading-skeleton";
import { decode } from "html-entities";

const fetchYoutubeData = async (keyword) => {
  const result = await apiClient.get("/api/news/youtube", {
    params: {
      keyword: keyword,
      limit: 20,
    },
  });
  return result.data;
};
export default function YoutubeData(props) {
  const keyword = useSelector((state) => state.keyword.keyword);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const {
    data = [],
    error,
    isLoading,
  } = useQuery(["youtubeData", keyword], () => fetchYoutubeData(keyword), {
    enabled: !!keyword,
    staleTime: Infinity,
    retry: false,
  });

  return (
    <StyledNewsDiv className="Youtube-Box">
      <StyledNewsKeyword darkMode={darkMode}>
        <span>{`"${keyword}"`}</span>이(가) 이렇게 언급됐어요
      </StyledNewsKeyword>
      <StyledNewsItemParentDiv>
        {isLoading ? (
          Array.from({ length: 20 }).map((_, index) => (
            <StyledContentsDiv key={index} darkMode={darkMode}>
              <Skeleton height={20} />
              <Skeleton height={15} />
              <Skeleton height={15} width="75%" />
            </StyledContentsDiv>
          ))
        ) : error ? (
          darkMode ? (
            <img
              src="/assets/images/no-data-box-darkmode.svg"
              alt="No search result"
              style={{ marginTop: "40px", width: "600px" }}
            />
          ) : (
            <img
              src="/assets/images/no-data-box.svg"
              alt="No search result"
              style={{ marginTop: "40px", width: "600px" }}
            />
          )
        ) : (
          <>
            {data.map((e, index) => (
              <a
                href={e.url}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
                <StyledNewsItemDiv key={index} darkMode={darkMode}>
                  <StyledVideoDiv>
                    <StyledNewsItemHeaderDiv darkMode={darkMode}>
                      <span>{e.channel}</span> |
                      <span>{timeAgo(e.pubDate)}</span>
                    </StyledNewsItemHeaderDiv>
                    <div className="youtube-title">{decode(e.title)}</div>
                  </StyledVideoDiv>
                  <StyledImageDiv>
                    <img src={e.thumbnail_url}></img>
                  </StyledImageDiv>
                </StyledNewsItemDiv>
              </a>
            ))}
          </>
        )}

        <StyledBlurDiv darkMode={darkMode}></StyledBlurDiv>
      </StyledNewsItemParentDiv>
    </StyledNewsDiv>
  );
}
