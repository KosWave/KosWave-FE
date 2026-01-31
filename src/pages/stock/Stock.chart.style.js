import styled from "styled-components";

export const StyledStockParentDiv = styled.div`
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${(props) => (props.darkMode ? "#282828" : "white")};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const StyledHeaderChart = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  & > span {
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 8px 80px;
    border-radius: 50px;
    background-color: white;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  }
`;

export const StyledSearchSpan = styled.span`
  color: #ec4b36;
  font-weight: bold;
`;
export const StyledPriceSpan = styled.span`
  color: #43d2ff;
  font-weight: bold;
`;

export const StyledStockDetailDiv = styled.div`
  width: 800px;
  background-color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  overflow-x: scroll;
`;
export const StyledMoveDetailPageDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  & button {
    background-color: rgba(0, 0, 0, 0.03);
    width: 300px;
    height: 45px;
    border-radius: 20px;
    border: none;

    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
      cursor: pointer;
    }
  }
`;
