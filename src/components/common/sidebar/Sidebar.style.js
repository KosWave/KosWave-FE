import styled, { css } from "styled-components";
import { AiOutlineHome } from "react-icons/ai";
import { IoStatsChart } from "react-icons/io5";
import { TbCirclesRelation } from "react-icons/tb";
import { VscSymbolKeyword } from "react-icons/vsc";
import { IoMoon, IoSunny } from "react-icons/io5";
import { MdToggleOff } from "react-icons/md";
import { BiSolidToggleRight } from "react-icons/bi";

export const StyledSidebarDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 250px;
  height: 100%;
  border-right: ${(props) =>
    props.darkMode ? "none" : "1px solid rgba(0, 0, 0, 0.2)"};
  background-color: ${(props) => (props.darkMode ? "rgb(35,35,35)" : "white")};
  padding-top: 20px;
`;

export const StyledSidebarInfoDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  & div {
    & > a {
      text-decoration: none;
      color: inherit;
      display: flex;
      align-items: center;
    }
  }
`;

export const StyledSidebarItemDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 60px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#43d2ff" : "transparent")};
  border-radius: ${({ active }) => (active ? "50px" : "0")};

  & span {
    margin-left: 15px;
    transition: color 0.1s;
    color: ${({ active }) => (active ? "white" : "rgba(0, 0, 0, 0.5)")};
    color: ${(props) => (props.darkMode ? "white" : "")};
  }

  & svg {
    color: ${({ active }) => (active ? "white" : "")};
    color: ${(props) => (props.darkMode ? "white" : "")};
  }

  &:hover {
    ${({ active }) =>
      !active &&
      css`
        background-color: #aaaaaa;
        border-radius: 50px;

        & span,
        & svg {
          color: white;
          transition: 0.1s;
        }
      `}
  }
`;

const iconStyles = css`
  font-size: 1.5rem !important;
  color: ${({ active }) => (active ? "white" : "rgba(0, 0, 0, 0.5)")};
  transition: color 0.3s;
`;

export const StyledHomeIcon = styled(AiOutlineHome)`
  ${iconStyles}
`;
export const StyledAnalyzeIcon = styled(IoStatsChart)`
  ${iconStyles}
`;
export const StyledRelateIcon = styled(TbCirclesRelation)`
  ${iconStyles}
`;
export const StyledKeywordIcon = styled(VscSymbolKeyword)`
  ${iconStyles}
`;

const DarkModeIconStyles = css`
  font-size: 1.4rem !important;
  margin: 5px;
  cursor: pointer;
`;

export const StyledHeaderFillMoonIcon = styled(IoMoon)`
  ${DarkModeIconStyles}
  color: ${({ darkmode }) => (darkmode ? "gold" : "rgba(0,0,0,0.3)")};
`;

export const StyledHeaderFillSunIcon = styled(IoSunny)`
  ${DarkModeIconStyles}
  color: ${({ darkmode }) => (darkmode ? "darkgray" : "#F87315")};
`;

export const StyledToggleIcon = styled(MdToggleOff)`
  font-size: 1.5rem !important;
  margin: 10px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.7);
  transition: color 0.1s;
`;

export const StyledToggleDarkIcon = styled(BiSolidToggleRight)`
  font-size: 1.5rem !important;
  margin: 10px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.7);
  transition: color 0.3s;
`;

export const StyledToggleContainer = styled.div`
  width: 40px;
  height: 25px;
  border-radius: 15px;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#47484A" : "#ddd")};
  display: flex;
  align-items: center;
  padding: 0 5px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s;
  margin: 0px 5px;
`;

export const StyledToggleCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  left: ${({ isDarkMode }) => (isDarkMode ? "calc(100% - 22.5px)" : "2.5px")};
  transition: left 0.3s;
`;
