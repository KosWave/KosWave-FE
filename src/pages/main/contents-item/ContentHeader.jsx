import React from "react";
import { HeaderContentDiv, GlowIcon } from "./ContentHeader.style";
import { HiChevronDoubleRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ContentHeader(props) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <HeaderContentDiv darkMode={darkMode}>
      <div
        style={{
          textAlign: "top",
          display: "flex",
        }}
      >
        <img style={{ width: "60px", height: "60px" }} src={props.imgUrl}></img>
        <span
          style={{
            display: "flex",
            fontSize: "22px",
            color: darkMode ? "white" : "#2E2E30",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <strong
            style={{
              fontSize: "28px",
              margin: "0 0.3rem",
            }}
          >
            "{props.keyword}"
          </strong>
          <span style={{ marginTop: "5px", display: "flex" }}>
            {props.description}
          </span>
        </span>
      </div>
      <div
        style={{
          textAlign: "top",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <a href={props.toLink}>
          <GlowIcon darkMode={darkMode}>
            <HiChevronDoubleRight
              style={{
                color: darkMode ? "#F2F2F2" : "#00537A",
                cursor: "pointer",
                width: "38px",
              }}
            ></HiChevronDoubleRight>
          </GlowIcon>
        </a>
      </div>
    </HeaderContentDiv>
  );
}
