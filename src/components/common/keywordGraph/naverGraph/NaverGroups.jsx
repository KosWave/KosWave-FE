import React from "react";
import { StyledNaverGroupDiv } from "./NaverGroup.style";
export default function NaverGroups() {
  return (
    <div style={{ marginTop: "30px" }}>
      <span>
        <strong>"불닭"</strong>을 가장 많이 검색한 그룹은...
      </span>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <StyledNaverGroupDiv>중년층 여성</StyledNaverGroupDiv>
        <StyledNaverGroupDiv>청년층 여성</StyledNaverGroupDiv>
        <StyledNaverGroupDiv>중년층 남성</StyledNaverGroupDiv>
      </div>
    </div>
  );
}
