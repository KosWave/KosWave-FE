import styled from "styled-components";

export const StyledSocialYoutubeDiv = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.darkMode ? "#47484A" : "white")};
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 30px;
  border-radius: 20px;
  margin-bottom: 30px;
`;

export const StyledYoutubeItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export const StyledYoutubeHeaderDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  width: 100%;

  & > nav:first-child {
    margin-right: 20px;
  }
`;

export const StyledYoutubeChartNewsDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > div > span:first-child {
    font-size: 23px;
    color: ${(props) => (props.darkMode ? "white" : "rgba(0, 0, 0, 0.7)")};
  }
`;

export const StyledLoadingDiv = styled.div`
  width: 600px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.darkMode ? "#47484A" : "white")};
`;
