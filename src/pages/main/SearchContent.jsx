import React, { useState, useEffect } from "react";
import { StyledMainContentDiv } from "./Main.style";
import ContentHeader from "./contents-item/ContentHeader";
import NormalGraph from "../../components/common/graphs/normalGraph/NormalGraph";
import { Contents } from "./contents-item/Contents.style";

import { useQuery } from "react-query";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";

/* const fetchStockData = async (keyword) => {
  console.log(`Fetching data for keyword: ${keyword}`);
  const response = await axios.get("/api/trends/google", {
    params: {
      keyword: keyword,
      startTime: 30,
    },
  });
  return JSON.parse(response.data);
}; */

const fetchNaverLabData = async (
  keywords,
  startDate,
  endDate,
  periodOffset
) => {
  const response = await axios.post("/api/trends/naver", {
    keywords,
    startDate,
    endDate,
    periodOffset,
  });
  console.log("naver111 : " + [keywords, startDate, endDate, periodOffset]);
  return response.data;
};

export default function SearchContent({ keyword }) {
  const [percent, setPercent] = useState(NaN);
  const [currentWeekData, setCurrentWeekData] = useState([]);
  const [currentWeekDates, setCurrentWeekDates] = useState([]);
  const [startDate, setStartDate] = useState(() => {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(
      currentDate.setDate(currentDate.getDate() - 30)
    );
    return sevenDaysAgo.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [periodOffset, setPeriodOffset] = useState(30);
  const [initialLoad, setInitialLoad] = useState(true);
  const keywords = [keyword];
  const darkMode = useSelector((state) => state.theme.darkMode);

  const {
    data: stockData,
    isLoading,
    error,
    refetch: refetchStockData,
  } = useQuery(
    ["naverLabData", keyword],
    () =>
      keyword || initialLoad
        ? fetchNaverLabData(keywords, startDate, endDate, periodOffset)
        : Promise.resolve(null),
    {
      staleTime: Infinity,
      enabled: initialLoad || !!keyword,
      //refetchInterval: 10000,
    }
  );
  console.log("stockData : " + stockData);
  useEffect(() => {
    setPercent(NaN);
    console.log("ssss : ", stockData);
    if (stockData) {
      const dayOfData = stockData[0].data.sort((a, b) => {
        return b.period - a.period;
      });
      let currentWeek = 0;
      let lastWeek = 0;
      const currentWeekValues = dayOfData.slice(-7).map((elem) => {
        currentWeek += parseFloat(elem.ratio);
        return parseFloat(elem.ratio);
      });
      const currentWeekTimes = dayOfData.slice(-7).map((elem) => {
        return elem.period;
      });

      dayOfData
        .slice(7, 14)
        .reverse()
        .map((elem) => {
          lastWeek += parseFloat(elem.ratio);
        });
      const calculatedPercent = ((currentWeek - lastWeek) / lastWeek) * 100;

      setPercent(Math.round(calculatedPercent * 100) / 100);
      setCurrentWeekData(currentWeekValues);
      setCurrentWeekDates(currentWeekTimes);

      console.log(percent);
    }
  }, [stockData]);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      refetchStockData();
    }
  }, [initialLoad, refetchStockData]);

  return (
    <StyledMainContentDiv darkMode={darkMode}>
      <ContentHeader
        imgUrl="/assets/images/search.svg"
        keyword={keyword}
        description={
          !isLoading ? (
            <div
              style={{ display: "flex", flexDirection: "row", width: "auto" }}
            >
              {Math.round(percent) > 0 && (
                <>
                  <p style={{ marginTop: "10px" }}>
                    의 검색량이 전 주에 비해
                    <strong
                      style={{
                        fontSize: "30px",
                        margin: "0 0.5rem",
                        marginTop: "2px",
                      }}
                    >
                      {Math.abs(Math.round(percent))}%
                    </strong>
                  </p>
                  <img
                    style={{
                      width: "40px",
                      height: "40px",
                      margin: "-0.5rem 0.5rem",
                      marginTop: "10px",
                    }}
                    src="/assets/images/increase.svg"
                    alt="increase"
                  />
                  <span style={{ marginTop: "18px" }}>증가했어요.</span>
                </>
              )}
              {Math.round(percent) < 0 && (
                <>
                  <p style={{ marginTop: "10px" }}>
                    의 검색량이 전 주에 비해
                    <strong
                      style={{
                        fontSize: "30px",
                        marginLeft: "0.5rem",
                        marginTop: "2px",
                      }}
                    >
                      {Math.abs(percent)}%
                    </strong>
                  </p>
                  <img
                    style={{
                      width: "40px",
                      height: "40px",
                      margin: "-0.5rem 0.5rem",
                      marginTop: "10px",
                    }}
                    src="/assets/images/decrease.svg"
                    alt="decrease"
                  />

                  <span style={{ marginTop: "18px" }}>감소했어요.</span>
                </>
              )}
              {Math.round(percent) === 0 && (
                <>의 이번주 검색량이 전 주와 동일해요.</>
              )}
              {Number.isNaN(percent) && <>에 대한 검색량을 불러올 수 없어요.</>}
            </div>
          ) : (
            <>
              <p>의 검색량을 불러오는 중이에요...</p>
            </>
          )
        }
        toLink="/main/social"
      />
      <Contents darkMode={darkMode}>
        {error || !isLoading ? (
          Number.isNaN(percent) ? (
            <div
              style={{
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {darkMode ? (
                <img
                  style={{ width: "750px", height: "165px" }}
                  src="/assets/images/no-data-darkmode.svg"
                ></img>
              ) : (
                <img
                  style={{ width: "750px", height: "165px" }}
                  src="/assets/images/no-data.svg"
                ></img>
              )}
            </div>
          ) : error ? (
            <div
              style={{
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {darkMode ? (
                <img
                  style={{ width: "750px", height: "165px" }}
                  src="/assets/images/undefined-error-darkmode.svg"
                ></img>
              ) : (
                <img
                  style={{ width: "750px", height: "165px" }}
                  src="/assets/images/undefined-error.svg"
                ></img>
              )}
            </div>
          ) : (
            <NormalGraph
              data={currentWeekData}
              date={currentWeekDates}
              color={[66, 133, 244]}
              lineSpeed={0.05}
              barSpeed={0.05}
              width={600}
              darkMode={darkMode}
            />
          )
        ) : (
          <div
            style={{
              width: "600px",
              height: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ClipLoader color="#43d2ff"></ClipLoader>
          </div>
        )}
      </Contents>
    </StyledMainContentDiv>
  );
}
