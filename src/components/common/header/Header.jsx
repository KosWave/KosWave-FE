import React from "react";
import { StyledHeaderDiv, StyledHeaderParentDiv } from "./Header.style";
import Search from "../search/Search";
import { useSelector } from "react-redux";

export default function Header() {
  return (
    <StyledHeaderDiv>
      <StyledHeaderParentDiv>
        <Search width="900px" height="50px" />
      </StyledHeaderParentDiv>
    </StyledHeaderDiv>
  );
}
