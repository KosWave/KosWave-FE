import React, { useRef, useState, useEffect, useMemo } from "react";
import InstagramGraph from "../../components/common/keywordGraph/instagramGraph/InstagramGraph";
import InstagramData from "../../components/common/news/instagram-data/instagram.data";
import InstagramHotHashTags from "../../components/common/keywordGraph/instagramGraph/InstagramHotHashTags";
import { useSelector } from "react-redux";
import {
  StyledSocialInstagramDiv,
  StyledInstagramItemDiv,
  StyledInstagramHeaderDiv,
  StyledInstagramChartNewsDiv,
} from "./Instagram.style";
import { getInstagramSocialTrend } from "../../lib/apis/social";

export default function InstagramItem() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [lineData, setLineData] = useState({});
  const [data, setData] = useState([]);
  const [topTags, setTopTags] = useState([]);
  const [tagInfo, setTagInfo] = useState([]);
  const [temp, setTemp] = useState(false);
  const keyword = useSelector((state) => state.keyword.keyword);
  const scrollRef = useRef(null);
  const [isGraphVisible, setIsGraphVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    async function fetchData(word) {
      try {
        setIsGraphVisible(false);
        setData([]);
        setTagInfo([]);
        setTopTags([]);
        setTemp(false);
        console.log("2222");
        const instagramInfo = await getInstagramSocialTrend(word);
        console.log("111");
        console.log("oin", instagramInfo);
        if (
          instagramInfo === undefined ||
          instagramInfo.tagInfo === undefined ||
          instagramInfo.topTags === undefined ||
          instagramInfo.trendData === undefined
        ) {
          console.log("dsfsfd");
          setTemp(true);
          return;
        }

        console.log("instagram", instagramInfo);
        setData(instagramInfo.trendData);
        setTopTags(instagramInfo.topTags);
        setTagInfo(instagramInfo.tagInfo);
        const labels = instagramInfo.trendData.map((item) => item.date);
        const counts = instagramInfo.trendData.map((item) => item.posts);
        const changes = instagramInfo.trendData.map((item, index) => {
          if (index === 0) return 0;
          return item.posts - instagramInfo.trendData[index - 1].posts;
        });

        setLineData({
          labels: labels,
          datasets: [
            {
              label: "포스트 수",
              data: counts,
              borderColor: "rgba(214, 41, 118, 1)",
              borderWidth: 3,
              yAxisID: "y1",
            },
            {
              label: "전월 대비 증감",
              data: changes,
              backgroundColor: darkMode
                ? "rgba(214, 41, 118, 0.7)"
                : "rgba(214, 41, 118, 0.2)",
              borderRadius: 20,
              barThickness: 20,
              yAxisID: "y2",
              type: "bar",
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData(keyword);
  }, [keyword]);

  useEffect(() => {
    if (data.length > 0) {
      const labels = data.map((item) => item.date);
      const counts = data.map((item) => item.posts);
      const changes = data.map((item, index) => {
        if (index === 0) return 0;
        return item.posts - data[index - 1].posts;
      });

      setLineData({
        labels: labels,
        datasets: [
          {
            label: "포스트 수",
            data: counts,
            borderColor: "rgba(214, 41, 118, 1)",
            borderWidth: 3,
            yAxisID: "y1",
          },
          {
            label: "전월 대비 증감",
            data: changes,
            backgroundColor: darkMode
              ? "rgba(214, 41, 118, 0.7)"
              : "rgba(214, 41, 118, 0.2)",
            borderRadius: 20,
            barThickness: 20,
            yAxisID: "y2",
            type: "bar",
          },
        ],
      });
    }
  }, [darkMode, data]);

  console.log("temp" + temp);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsGraphVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
      }
    );

    observerRef.current.observe(scrollRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const options = useMemo(() => {
    const maxDataValue = Math.max(...(lineData.datasets?.[1]?.data || []));
    const minDataValue = Math.min(...(lineData.datasets?.[1]?.data || []));
    const range = Math.max(Math.abs(maxDataValue), Math.abs(minDataValue));
    const symRange = range;

    const formatYAxisLabel = (value) => {
      if (Math.abs(value) >= 1000000) {
        return (Math.abs(value) / 1000000).toFixed(1) + "M";
      } else if (Math.abs(value) >= 1000) {
        return (Math.abs(value) / 1000).toFixed(0) + "K";
      }
      return value;
    };

    return {
      scales: {
        y1: {
          beginAtZero: true,
          position: "left",
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            color: darkMode ? "white" : "black", // y1축 텍스트 색상 설정
            callback: (value) => formatYAxisLabel(value),
          },
        },
        y2: {
          beginAtZero: true,
          position: "right",
          grid: {
            drawTicks: true,
            display: true,
          },
          ticks: {
            color: darkMode ? "white" : "black", // y2축 텍스트 색상 설정
            callback: (value) => {
              let formattedValue = formatYAxisLabel(Math.abs(value));
              if (value > 0) {
                return `${formattedValue}`;
              } else if (value < 0) {
                return `-${formattedValue}`;
              }
              return formattedValue;
            },
          },
          min: -symRange,
          max: symRange,
        },
        x: {
          beginAtZero: true,
          ticks: {
            color: darkMode ? "white" : "black", // x축 텍스트 색상 설정
          },
        },
      },
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
    };
  }, [darkMode, lineData]);

  return (
    <StyledSocialInstagramDiv darkMode={darkMode}>
      <StyledInstagramItemDiv>
        <div>
          <img src="/assets/images/instagram-logo.png" alt="Instagram Logo" />
        </div>
        <div></div>
      </StyledInstagramItemDiv>
      {temp ? (
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
          <StyledInstagramChartNewsDiv ref={scrollRef} darkMode={darkMode}>
            {
              <div style={{ marginTop: "18px" }}>
                <div>
                  <span
                    style={{
                      fontSize: "16px",
                      color: darkMode ? "white" : "rgba(0, 0, 0, 0.7)",
                    }}
                  >
                    <strong>"{keyword}"</strong>이(가) 이만큼 언급됐어요
                  </span>
                  {isGraphVisible && data ? (
                    <InstagramGraph
                      data={data.length}
                      lineData={lineData}
                      options={options}
                    />
                  ) : (
                    <InstagramGraph></InstagramGraph>
                  )}
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "18px",
                      color: darkMode ? "white" : "rgba(0, 0, 0, 0.7)",
                    }}
                  >
                    <strong>"{keyword}"</strong>과 함께 반응이 좋은 해시태그
                  </span>
                  <InstagramHotHashTags topTags={topTags} />
                </div>
              </div>
            }

            <InstagramData tagInfo={tagInfo} />
          </StyledInstagramChartNewsDiv>
        </>
      )}
    </StyledSocialInstagramDiv>
  );
}
