import styled from "styled-components";

export const StyledMainDiv = styled.div`
  background-color: ${(props) => (props.darkMode ? "#282828" : null)};
  display: flex;
  width: 100vw;
  height: 100%;
`;

export const MainBody = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

export const MainContent = styled.div`
  display: block;
  flex: 1;
  width: 100vw;
  height: auto;
  overflow-y: scroll;
`;

export const StyledMainContentDiv = styled.div`
  background-color: ${(props) => (props.darkMode ? "#333333" : "white")};
  width: 90%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 20px;
  margin-bottom: 30px;
  overflow-x: auto;
  white-space: nowrap;
  position: relative;
`;

export const StyledContentWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  gap: 50px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 30px;
  }
`;
