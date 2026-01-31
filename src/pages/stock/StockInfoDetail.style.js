import styled from "styled-components";
import { MdKeyboardArrowRight } from "react-icons/md";

export const StyledStockDetailDiv = styled.div`
  width: 800px;
  background-color: ${(props) => (props.darkMode ? "#282828" : "white")};
  padding: 10px;
  padding-bottom: 30px;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
export const StyledInfoDetailDiv = styled.div`
  min-width: 200px;
  width: auto;
  height: 110px;
  background-color: ${(props) =>
    props.darkMode ? "#333333" : "rgba(0,0,0,0.02)"};
  border-radius: 10px;
  padding: 10px;
  margin-right: 10px;

  div {
    display: flex;
    flex-direction: row;
  }
  div p {
    color: gray;
    width: 50%;
    font-size: 14px;
  }
  span {
    font-weight: normal;
    color: gray;
  }

  p {
    margin-bottom: 0px;
  }
`;

export const StyledTitleStockDetail = styled.p`
  font-size: 15px;
  height: 20px;
  font-weight: bold;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  color: ${(props) => (props.darkMode ? "darkgray" : "")};
`;

export const StyledStockDetailTime = styled.span`
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  margin-left: 10px;
  font-weight: 600 !important;
  color: ${(props) => (props.darkMode ? "darkgray" : "blaxk")};
`;

export const StyledMoveDetailDiv = styled.div`
  width: 800px;
  background-color: ${(props) => (props.darkMode ? "#333333" : "")};
  color: ${(props) => (props.darkMode ? "white" : "")};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
  border-radius: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
    cursor: pointer;
  }
  & > span {
    display: flex;
    align-items: center;
  }
`;

export const StyledMoveIcon = styled(MdKeyboardArrowRight)`
  padding-top: 4px;
  margin-left: 10px;
  font-size: 1.5rem !important;
`;
