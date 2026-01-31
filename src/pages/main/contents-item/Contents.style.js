import styled from "styled-components";

export const StyledContentsDiv = styled.div`
  background-color: ${(props) => (props.darkMode ? "#47484A" : "white")};
  color: ${(props) => (props.darkMode ? "white" : "black")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || "377px"};
  height: ${(props) => props.height || "196px"};
  padding: 15px;
  align-text: center;
  cursor: pointer;
  border: 2px solid #d3d3d3;
  border-radius: 20px;
  margin: 4px;
  
  &:hover {
    border-color: #43d2ff;
  }
`;

// TitleGroup
export const StyledContentsTitleGroup = styled.div`
  margin-top:15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-weight: 800;
  font-size: 1.5rem;
`;

export const Contents = styled.div`
  background-color: ${(props) => (props.darkMode ? "#333333" : "white")};
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  overflow: auto;
  white-space: nowrap;
`;

// Title & SubTitle & MiniTitle
export const StyledContentsTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  font-size: 18px;
  width: 10vw;
`;
export const StyledContentsSubTitle = styled.div``;
export const StyledContentsMiniTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 9px;

  & p {
    font-size: 0.9rem !important;
    font-weight: 500;
    color: ${(props) =>
      props.signperyesterday > 0
        ? "#43d2ff"
        : props.signperyesterday < 0
        ? "#ec4b3b"
        : props.darkMode
        ? "white"
        : "black"};

  & img {
    height: 10px;
  }
`;

// Tag
export const StyledContentsTag = styled.div`
  display: flex;
  gap: 10px;
  font-size: 0.7rem !important;
  margin-top: 10px;

  & .price-box {
    display: flex;
    gap: 5px;
    padding: 5px;
    background-color: rgb(211, 211, 211, 0.3);
    border: 1px solid rgb(211, 211, 211, 0.3);
    border-radius: 8px;
  }

  & p {
    color: orangered;
  }
`;
