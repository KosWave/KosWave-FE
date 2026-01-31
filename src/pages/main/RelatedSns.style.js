import styled from "styled-components";
export const StyledTitleDiv = styled.div`
  width: 90%;
  height: auto;
  text-align: center;
  padding: 10px 50px;
  border-radius: 50px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

  background-color: #9badb3;
  color: white;
  font-weight: bold;
`;
export const YoutubeContent = styled.div`
  background-color: ${(props) => (props.darkMode ? "#47484A" : "#E0E0E0")};
  width: 90%;
  height: 200px;
  border-radius: 9px;
  align-content: center;
  justify-content:center;
`;
export const InstagramContent = styled.div`
  background-color: ${(props) => (props.darkMode ? "#47484A" : "#E0E0E0")};
  width: 90%;
  height: 120px;
  border-radius: 9px;
  align-content: center;
`;
export const StyledMainContentDiv = styled.div`
  background-color: ${(props) => (props.darkMode ? "#333333" : "white")};
  position:relative;
  width: 37vw;
  height: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 20px;
  margin-bottom: 30px;
  white-space: nowrap;
  gap: 30px;
`;
