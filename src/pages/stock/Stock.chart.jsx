import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import StChart from '../stock/detail/chart/StockChart';
import { useSelector } from "react-redux";
import StockInfoDetail from "./StockInfoDetail";
import { StyledStockParentDiv } from "./Stock.chart.style";

export default function StockChart(props) {
  const keyword = useSelector((state) => state.keyword.keyword);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const stockMode = useSelector((state) => state.stock.stockMode);


  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([
    {
      name: keyword,
      data: [], // 초기에는 빈 배열로 설정
      yAxisIndex: 0,
    },
    {
      name: props.curCompanyName,
      data: [], // 초기에는 빈 배열로 설정
      yAxisIndex: 1,
    },
  ]);

  const getInitialOptions = (darkMode) => ({
    chart: {
      id: "basic-area",
      toolbar: {
        show: false,
      },
      background: darkMode ? "#333" : "#fff",
      stacked: false,
      zoom: {
        enabled: false,
      },
    },
    theme: {
      mode: darkMode ? "dark" : "light",
    },
    xaxis: {
      categories: categories,
      type: "category",
      tickAmount: 6,
      labels: {
        show: true,
        style: {
          colors: darkMode ? "#fff" : "#333",
        },
        rotate: 0,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: [
      {
        min: 0,
        labels: {
          show: true,
          formatter: (value) => value.toFixed(0),
          style: {
            colors: darkMode ? "#fff" : "#333",
          },
        },
      },
      {
        opposite: true,
        labels: {
          show: true,
          formatter: (value) => value.toFixed(0),
          style: {
            colors: darkMode ? "#fff" : "#333",
          },
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      theme: darkMode ? "dark" : "light",
    },
    colors: ["rgba(236, 75, 54, 0.9)", "rgba(168, 232, 249, 0.9)"],
  });

  const [options, setOptions] = useState(getInitialOptions(darkMode));

  useEffect(() => {
    async function getSeries() {
      const flattenedData = await props.data.map((e) => e.ratio);
      return flattenedData;
    }

    if (props.data && props.data.length > 0) {
      getSeries().then((flattenedData) => {
        setSeries([
          {
            name: keyword,
            data: flattenedData,
            yAxisIndex: 0,
          },
          {
            name: props.curCompanyName,
            data: [...props.curCompanyPrice],
            yAxisIndex: 1,
          },
        ]);

        const newCategories = props.data.map((e) => {
          let date = new Date(e.period);
          let day = date.getDate();
          let month = date.getMonth() + 1;
          return `${month}/${day}`;
        });

        setCategories(newCategories);

        setOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: newCategories,
          },
        }));
      });
    }
  }, [props.data, props.curCompanyPrice, keyword]);

  useEffect(() => {
    setOptions(getInitialOptions(darkMode));
  }, [darkMode]);

  return (
    <StyledStockParentDiv darkMode={darkMode}>
      {
        stockMode ?
        <StChart symbol={props.curCompanyCode} />
        :
        <Chart
        options={options}
        series={series}
        type="area"
        width="790"
        height="585"
      />
      }
      <StockInfoDetail
        info={props.stockDetails}
        curCompanyCode={props.curCompanyCode}
        curCompanyName={props.curCompanyName}
      />
    </StyledStockParentDiv>
  );
}
