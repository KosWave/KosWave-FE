import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
} from "chart.js";
import styled from "styled-components";
import { getInstagramSocialTrend } from "../../../../lib/apis/social";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale
);

const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
  width: 550px;
  height: 300px;
  padding: 10px;
`;

const InstagramGraph = ({ data, lineData, options }) => {
  // console.log(lineData, options);
  console.log(data, lineData, options);
  return data > 0 ? (
    <ChartWrapper>
      <Line data={lineData} options={options} />
    </ChartWrapper>
  ) : (
    <div
      style={{
        display: "flex",
        margin: "0px",
        width: "550px",
        height: "300px",
        padding: "10px",
      }}
    ></div>
  );
};

export default InstagramGraph;
