import styled from "styled-components";

export const StyledStockDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const StyledStockRightDiv = styled.div`
  background-color: ${(props) => (props.darkMode ? "#282828" : "#fffcf9")};
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledStockHeaderDiv = styled.div`
  margin-left: 50px;
  font-size: 18px;
  margin-bottom: 40px;

  color: ${(props) => (props.darkMode ? "white" : "")};
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-left: 20px;
    margin-right: 20px;
  }

  & strong {
    font-size: 22px;
    margin-right: 5px;

    @media (max-width: 768px) {
      font-size: 18px;
    }
  }

  & span:nth-of-type(1) {
    color: #43d2ff;
  }
  & span:nth-of-type(2) {
    color: #ec4b36;
  }
`;

export const StyledStockBodyDiv = styled.div`
  width: 100%;
  height: auto;
  min-height: 700px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 50px;
  padding-top: 0px;
  
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const StyledBodyCompanyDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  height: 100%;
  overflow-y: scroll;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledLoadingDiv = styled.div`
  width: 800px;
  height: 550px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.darkMode ? "#47484A" : "white")};
  
  @media (max-width: 1024px) {
    width: 90vw;
    height: 400px;
    margin-left: 0;
  }
`;

export const StyledContentsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width || "377px"};
  height: ${(props) => props.height || "196px"};
  padding: 30px;

  border: 1px solid #d3d3d3;
  border-radius: 50px;
  background-color: ${(props) => (props.darkMode ? "#47484A" : "white")};
`;

export const StyledHeaderChart = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

export const StyledSearchSpan = styled.span`
  color: #ec4b36;
  font-weight: bold;
`;
export const StyledPriceSpan = styled.span`
  color: #43d2ff;
  font-weight: bold;
`;

export const BlurDiv = styled.div`
  width: calc(100% - 30px);
  height: 70px;
  position: absolute;
  bottom: -26px;
  background: ${(props) =>
    props.darkMode
      ? `linear-gradient(
    to top,
    transparent,
    0%,
    #282828,
    70%,
    transparent
  )`
      : `linear-gradient(
    to top,
    transparent,
    0%,
    #fafcff,
    50%,
    transparent
  )`};
`;

export const StyledTitleDiv = styled.div`
  width: auto;
  padding: 10px 50px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 50px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => (props.darkMode ? "#47484A" : "white")};
  color: ${(props) => (props.darkMode ? "white" : "")};
`;

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
