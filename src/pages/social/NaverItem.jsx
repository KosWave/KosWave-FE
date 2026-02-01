import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import CountrySelectBar from "../../components/common/chart-select-bar/country/Country.select.bar";
import PeriodSelectBar from "../../components/common/chart-select-bar/period/Period.select.bar";
import GoogleNews from "../../components/common/news/google-news/Google.news";
import NaverNews from "../../components/common/news/naver-news/Naver.news";
import NaverGraph from "../../components/common/keywordGraph/naverGraph/NaverGraph";
import NaverGroups from "../../components/common/keywordGraph/naverGraph/NaverGroups";
import {
  StyledSocialNaverDiv,
  StyledNaverItemDiv,
  StyledNaverHeaderDiv,
  StyledNaverChartNewsDiv,
  StyledLoadingDiv,
} from "./NaverItem.style";
import { useSelector } from "react-redux";
import { isError, useQuery } from "react-query";
import { ClipLoader } from "react-spinners";

const fetchNaverStockData = async (
  keywords,
  startDate,
  endDate,
  periodOffset,
  setLoadError
) => {
  setLoadError(false);
  const response = await axios.post("/api/trends/naver", {
    keywords,
    startDate,
    endDate,
    periodOffset,
  });
  return response.data;
};

const NaverItem = () => {
  const keyword = useSelector((state) => state.keyword.keyword);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const scrollRef = useRef(null);
  const [loadError, setLoadError] = useState(false);
  const [isGraphVisible, setIsGraphVisible] = useState(false);
  const [startDate, setStartDate] = useState(() => {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(
      currentDate.setDate(currentDate.getDate() - 7)
    );
    return sevenDaysAgo.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [periodOffset, setPeriodOffset] = useState(7);

  const keywords = [keyword];

  const { data, isLoading, error, refetch } = useQuery(
    ["naverKeywordData", { keywords, startDate, endDate, periodOffset }],
    () =>
      fetchNaverStockData(
        keywords,
        startDate,
        endDate,
        periodOffset,
        setLoadError
      ),
    {
      staleTime: Infinity,
      enabled: !!keyword,
      retry: false,
    }
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsGraphVisible(true); // Set visibility state to true if intersecting
            observer.disconnect(); // Disconnect observer once graph is visible
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(scrollRef.current);

    return () => {
      observer.disconnect(); // Cleanup function to disconnect observer on unmount
    };
  }, []);

  useEffect(() => {
    if (keyword) {
      setLoadError(false);
      refetch();
    }
  }, [keyword, refetch]);

  const handlePeriodChange = (selectedPeriod) => {
    let t = "";
    if (selectedPeriod.includes("일")) {
      let index = selectedPeriod.indexOf("일");
      t = selectedPeriod.slice(0, index);
    } else {
      let index = selectedPeriod.indexOf("일");
      t = Number(selectedPeriod.slice(0, index)) * 365;
    }

    const currentDate = new Date();
    const newEndDate = new Date(currentDate.setDate(currentDate.getDate() - t))
      .toISOString()
      .split("T")[0];

    setStartDate(newEndDate);
    setEndDate(new Date().toISOString().split("T")[0]);
    setPeriodOffset(t);
  };
  return (
    <StyledSocialNaverDiv darkMode={darkMode}>
      <StyledNaverItemDiv>
        <div>
          <img src="/assets/images/naver.png" alt="naver" />
        </div>
        <StyledNaverHeaderDiv>
          <PeriodSelectBar handlePeriodChange={handlePeriodChange} />
        </StyledNaverHeaderDiv>
        <div></div>
      </StyledNaverItemDiv>
      <StyledNaverChartNewsDiv ref={scrollRef} darkMode={darkMode}>
        {loadError || error ? (
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
                  <StyledLoadingDiv>
                    <ClipLoader color={"#E56717"} loading={true} />
                  </StyledLoadingDiv>
                ) : (
                  <NaverGraph data={data[0].data} />
                )
              ) : (
                <div
                  style={{ marginTop: "20px", width: "600px", height: "400px" }}
                ></div>
              )}
            </div>
            <NaverNews setLoadError={setLoadError} loadError={loadError} />
          </>
        )}
      </StyledNaverChartNewsDiv>
    </StyledSocialNaverDiv>
  );
};

export default NaverItem;
