import styled from "styled-components";

export const StyledMainContentDiv = styled.div`
  background-color: ${(props) => (props.darkMode ? "#333333" : "white")};
  width: 37vw;
  height: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 20px;
  margin-bottom: 30px;
  position: relative;
  white-space: nowrap;
  gap: 70px;
  
`;

export const StyledBubbleContainer = styled.div`
  background-color: ${(props) => (props.darkMode ? "#333333" : "white")};
  position: relative;
  width: 100%;
  height: 100%;
`;
