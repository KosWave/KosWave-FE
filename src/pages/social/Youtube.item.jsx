import React, { useRef, useState, useEffect } from "react";
import CountrySelectBar from "../../components/common/chart-select-bar/country/Country.select.bar";
import PeriodSelectBar from "../../components/common/chart-select-bar/period/Period.select.bar";
import YoutubeData from "../../components/common/news/youtube-data/Youtube.data";
import YoutubeGraph from "../../components/common/keywordGraph/youtubeGraph/YoutubeGraph";
import {
  StyledSocialYoutubeDiv,
  StyledYoutubeItemDiv,
  StyledYoutubeHeaderDiv,
  StyledYoutubeChartNewsDiv,
  StyledLoadingDiv,
} from "./Youtube.style";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const fetchYoutubeStockData = async (
  keyword,
  startTime,
  setLoadError,
  loadError
) => {
  const response = await axios.get("/api/trends/youtube", {
    params: {
      keyword: keyword,
      startTime: startTime,
    },
  });
  return JSON.parse(response.data);
};

export default function YoutubeItem() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const scrollRef = useRef(null);
  /* const [loadError, setLoadError] = useState(false); */
  const [isGraphVisible, setIsGraphVisible] = useState(false);
  const keyword = useSelector((state) => state.keyword.keyword);
  const [startTime, setStartTime] = useState(7);
  const { data, isLoading, error, refetch } = useQuery(
    ["youtubeStockData", keyword, startTime],
    () =>
      startTime
        ? fetchYoutubeStockData(keyword, startTime)
        : Promise.resolve(null),
    {
      staleTime: Infinity,
      enabled: !!keyword, // keyword이 존재할 때만 요청을 보냄
      retry: false,
    }
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsGraphVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(scrollRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handlePeriodChange = (selectedPeriod) => {
    let t = "";
    if (selectedPeriod.includes("일")) {
      let index = selectedPeriod.indexOf("일");
      t = selectedPeriod.slice(0, index);
    } else {
      let index = selectedPeriod.indexOf("일");
      t = Number(selectedPeriod.slice(0, index)) * 365;
    }
    setStartTime(t);
  };

  return (
    <StyledSocialYoutubeDiv darkMode={darkMode}>
      <StyledYoutubeItemDiv>
        <div>
          <img
            src="/assets/images/YouTube_logo.png"
            alt="Youtube"
            width={"120px"}
            height={"30px"}
          />
        </div>
        <StyledYoutubeHeaderDiv>
          <PeriodSelectBar handlePeriodChange={handlePeriodChange} />
        </StyledYoutubeHeaderDiv>
        <div></div>
      </StyledYoutubeItemDiv>
      <StyledYoutubeChartNewsDiv ref={scrollRef} darkMode={darkMode}>
        {error ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {darkMode ? (
              <img
                src="/assets/images/no-data-darkmode.svg"
                width={"70%"}
                height={"400px"}
              />
            ) : (
              <img
                src="/assets/images/no-data.svg"
                width={"70%"}
                height={"400px"}
              />
            )}
          </div>
        ) : (
          <>
            <div>
              <span>
                <strong>{`"${keyword}"`}</strong>이(가) 이만큼 언급됐어요
              </span>
              {isGraphVisible ? (
                isLoading ? (
                  <StyledLoadingDiv darkMode={darkMode}>
                    <ClipLoader color={"#43D2FF"} loading={true} />
                  </StyledLoadingDiv>
                ) : (
                  <YoutubeGraph data={data?.default?.timelineData || []} />
                )
              ) : (
                <div
                  style={{ marginTop: "20px", width: "600px", height: "400px" }}
                ></div>
              )}
            </div>
            <YoutubeData />
          </>
        )}
      </StyledYoutubeChartNewsDiv>
    </StyledSocialYoutubeDiv>
  );
}
