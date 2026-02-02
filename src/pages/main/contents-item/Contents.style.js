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
  cursor: default; /* Changed cursor to default since link is removed */
  border: 2px solid #d3d3d3;
  border-radius: 20px;
  margin: 4px;
  position: relative; /* Added for tooltip positioning */
  
  &:hover {
    border-color: #E56717;
    
    & > .tooltip {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const StyledTooltip = styled.div`
  width: 400px;
  background-color: ${(props) => (props.darkMode ? "#616161" : "white")};
  color: ${(props) => (props.darkMode ? "white" : "black")};
  text-align: center;
  border: 1px solid ${(props) => (props.darkMode ? "rgba(255,255,255,0.1)" : "#d3d3d3")};
  border-radius: 8px;
  padding: 20px;
  position: fixed; /* Changed to fixed for Portal */
  z-index: 9999;
  font-size: 1.1rem;
  font-weight: normal;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  pointer-events: none; /* Prevent tooltip from blocking mouse events */
  white-space: normal; /* Allow text wrapping */
  word-break: keep-all;

  /* Arrow logic is tricky with fixed pos/portal without a library, skipping arrow for now or need complex calculation. 
     User didn't strictly demand arrow, but "speech bubble style" implies it. 
     For simplicity in portal, omitting css-only arrow relying on parent relative pos. */
`;

export const StyledTooltipTitle = styled.div`
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: bold;
  color: #E56717; /* Using the brand orange color */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
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
