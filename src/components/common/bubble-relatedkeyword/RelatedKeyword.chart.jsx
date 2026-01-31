import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useQuery } from "react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; // Make sure you have this installed
import "react-loading-skeleton/dist/skeleton.css"; // Import CSS for the skeleton
import { StyledInfoIcon } from "./RelatedKeyword.style";
import { useSelector } from "react-redux";
import { fetchNaverStockData } from "../../../lib/apis/Naver-Trends";

import './Chart_Background.css'

export default function RelatedKeywordChart(props) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [color, setColor] = useState([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (darkMode) {
      setColor(["rgba(0, 170, 255, 0.9)", "rgba(31, 255, 154, 0.9)"])
    } else {
      setColor(["rgba(26, 175, 255, 0.9)", "rgba(46, 233, 183, 0.9)"])
    }
    // 필요한 다른 로직 수행
  }, [darkMode]);


  const today = new Date();
  const MonthAgo = new Date(today);
  MonthAgo.setDate(today.getDate() - 30);
 // 네이버 데이터랩 요청 날짜 형식으로 변환 (ex. 2024-06-22)
  const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  };
  // startDate: 7일 전 날짜
  // endDate: 현재날짜
  const startDate = formatDate(MonthAgo);
  const endDate = formatDate(today);
  const periodOffset = 30;
  const keyword = [props.keyword];
  const related = [props.related];

  const {
    data: GraphData1,
    isLoading: isLoadingGraph1,
    error: errorGraph1,
  } = useQuery(
    ["NaverTrendsData1", [props.keyword, darkMode]],
    () => fetchNaverStockData(
        keyword,
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

  const {
    data: GraphData2,
    isLoading: isLoadingGraph2,
    error: errorGraph2,
  } = useQuery(
    ["NaverTrendsData2", [props.related, darkMode]],
    () => fetchNaverStockData(
        related,
        startDate,
        endDate,
        periodOffset,
        setLoadError
      ),
    {
      staleTime: Infinity,
      enabled: !!related,
      retry: false,
    }
  );

  if (errorGraph1 || errorGraph2) {
    return (
      <div>
        Error loading related keywords:{" "}
        {errorGraph1?.message || errorGraph2?.message}
      </div>
    );
  }

  if (!GraphData1 || !GraphData2) {
    return (
      <div style={{ margin: "0.8rem", padding: "10px", borderRadius: "10px" }}>
        <Skeleton width={580} height={270} />
        <Skeleton width={580} height={270} />
      </div>
    );
  }

  console.log("네이버 응답데이터")
  console.log(GraphData1)


  const data1 = GraphData1[0]?.data || [];
  const data2 = GraphData2[0]?.data|| [];
  const categories = [];
  const value1 = [];
  const value2 = [];

  console.log(data1)
  data1.forEach((e) => {
    const date = new Date(e.period);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    categories.push(`${month}/${day}`);
    value1.push(e.ratio);
  });

  console.log(categories,value1)

  data2.forEach((e) => {
    value2.push(e.ratio);
  });

  const options = {
    chart: {
      type: "line",
      height: 350,
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 1500,
        animateGradually: {
          enabled: true,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 150,
        },
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: false,
          customIcons: [],
        },
      },
    },
    theme: {
      mode: darkMode ? "dark" : "light",
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: `지난 30일 간의 ${props.keyword} 및 ${props.related} 구글 검색량 비교`,
      align: "center",
    },
    xaxis: {
      categories: categories,
      labels: {
        show: false,
      },
    },
    colors: color,
  };

  const series = [
    {
      name: props.keyword,
      data: value1,
    },
    {
      name: props.related,
      data: value2,
    },
  ];

  return (
    <div style={{ zIndex: -1, position: "relative" }}>
      <StyledInfoIcon darkMode={darkMode}>
        <img
          id="tooltip"
          src="/assets/images/question_mark.png"
          width={"21px"}
        ></img>
        <div id="tag">
          Google에서 한 달 동안의 검색된 추이를 보여줍니다. 가장 많이 검색된
          날을 100으로 고정하여 상대값을 보여주며, 연관키워드 역시 한 달 중
          최고치를 기준으로 상대값을 보여줍니다.
        </div>
      </StyledInfoIcon>
      <Chart
      className="abc"
        key={`${props.keyword}-${props.related}`} // 키를 이용해 컴포넌트 리렌더링
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
}
