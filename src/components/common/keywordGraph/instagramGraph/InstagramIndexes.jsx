import React from "react";
import { useSelector } from "react-redux";

const InstagramIndex = ({ index, info, isFirst, isLast }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <div
      style={{
        width: "50%",
        height: "80px",
        justifyContent: "center",
        boxSizing: "content-box",
        borderLeft: !isFirst ? "none" : "1px solid black",
        borderRight: "1px solid black",
        alignContent: "center",
        backgroundColor: darkMode ? "" : "white", // fallback color for non-dark mode
        backgroundImage: darkMode
          ? "linear-gradient(to right, rgba(137, 134, 134, 0.3), rgba(135, 100, 138, 0.3)"
          : "",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "bold",
          background: "linear-gradient(to right, #FF049A, #2F0DFF)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {index}
      </div>
      <div style={{ textAlign: "center", fontSize: "14px", marginTop: "5px" }}>
        <span style={{ color: darkMode ? "white" : "rgba(0, 0, 0, 0.7)" }}>
          {info}
        </span>
      </div>
    </div>
  );
};

export default function InstagramIndexes({ tagInfo }) {
  return tagInfo ? (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: "10px",
      }}
    >
      <InstagramIndex index={tagInfo[0]} info="포스트 수" isFirst />
      <InstagramIndex index={tagInfo[1]} info="상위 비율" isLast />
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: "10px",
      }}
    ></div>
  );
}
