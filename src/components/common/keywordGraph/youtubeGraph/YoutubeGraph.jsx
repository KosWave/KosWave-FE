import React, { useEffect } from "react";
import NormalGraph from "../../graphs/normalGraph/NormalGraph";
import { useSelector } from "react-redux";
const formatDate = (dateStr) => {
  let datePart = dateStr.includes("–") ? dateStr.split("–")[0].trim() : dateStr;
  const parts = datePart.split(" ");

  const month = parts[0];
  const day = parts[1].replace(",", "");
  // monthMap 정의
  const monthMap = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  if (parts.length === 2) {
    return `${monthMap[month]}.${day}`;
  }

  const year = parts[2];
  return `${year.slice(-2)}.${monthMap[month]}.${day}`;
};
export default function YoutubeGraph(props) {
  const date = props.data.map((e) => e.formattedAxisTime) || []; // 유효성 검사
  const data = props.data.map((e) => e.formattedValue[0]) || []; // 유효성 검사

  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    window.noLoop = false;
    return () => {
      window.noLoop = true;
    };
  }, []);
  return (
    <div style={{ marginTop: "20px" }}>
      {data.length < 10 ? (
        <NormalGraph
          data={[...data]} // 데이터가 배열임을 보장
          date={date.map((item) => {
            return formatDate(item);
          })}
          color={[255, 0, 0]}
          lineSpeed={0.05}
          barSpeed={0.05}
          darkMode={darkMode}
        />
      ) : (
        <NormalGraph
          data={[...data]} // 데이터가 배열임을 보장
          date={date.map((item) => {
            return formatDate(item);
          })}
          color={[255, 0, 0]}
          lineSpeed={0.2}
          barSpeed={0.11}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}
