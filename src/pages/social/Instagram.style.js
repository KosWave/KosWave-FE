import styled from "styled-components";

export const StyledSocialInstagramDiv = styled.div`
  width: 90%;
  background-color: ${(props) => (props.darkMode ? "#47484A" : "white")};

  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 30px;
  border-radius: 20px;
  margin-bottom: 30px;
`;

export const StyledInstagramItemDiv = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 20px;
  }
`;
export const StyledInstagramHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  & > nav:first-child {
    margin-right: 20px;
  }
`;

export const StyledInstagramChartNewsDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 20px;
  }

  & > div > span:first-child {
    font-size: 23px;
    color: ${(props) => (props.darkMode ? "white" : "rgba(0, 0, 0, 0.7)")};
  }
`;
