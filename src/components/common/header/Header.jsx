import React from "react";
import { StyledHeaderDiv, StyledHeaderParentDiv } from "./Header.style";
import Search from "../search/Search";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "../../../store/reducers/sidebar";
import styled from "styled-components";


const StyledMenuIcon = styled(GiHamburgerMenu)`
  display: none;
  cursor: pointer;
  margin-right: 20px;
  font-size: 24px;
  color: ${props => props.darkMode ? "white" : "black"};

  @media (max-width: 768px) {
    display: block;
  }
`;

export default function Header() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <StyledHeaderDiv>
      <StyledHeaderParentDiv>
        <StyledMenuIcon darkMode={darkMode} onClick={() => dispatch(openSidebar())} />
        <Search width="900px" height="50px" />
      </StyledHeaderParentDiv>
    </StyledHeaderDiv>
  );
}
