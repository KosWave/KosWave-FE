import styled from "styled-components";

export const StyledContentsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width || "377px"};
  height: ${(props) => props.height || "196px"};
  padding: 30px;
  padding-top: 20px;

  border: ${(props) =>
    props.isCheck ? "2px solid #E56717" : "1px solid #d3d3d3;"};
  border-radius: 40px;
  background-color: ${(props) => (props.darkMode ? "#47484A" : "white")};
  color: ${(props) => (props.darkMode ? "white" : "")};
  &:hover {
    border: ${(props) => (props.isCheck ? "" : "1px solid #E56717")};
  }
`;

// TitleGroup
export const StyledContentsTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;

  font-weight: 800;
  font-size: 1.1rem;
`;
// Title & SubTitle & MiniTitle
export const StyledContentsTitle = styled.div``;
export const StyledContentsSubTitle = styled.div``;
export const StyledContentsMiniTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & span {
    font-size: 0.7rem !important;
    font-weight: 400;
    color: ${(props) => (props.isPriceIncrease ? "tomato" : "#4284F3")};
  }

  & img {
    height: 10px;
  }
`;

// Tag
export const StyledContentsTag = styled.div`
  display: flex;
  font-size: 0.7rem !important;

  & > div {
    margin-top: 5px;
    display: flex;
    padding: 5px;
    background-color: rgb(211, 211, 211, 0.3);
    border: 1px solid rgb(211, 211, 211, 0.3);
    border-radius: 8px;
  }

  & span {
    color: orangered;
  }
`;
