import styled from "styled-components";

export const StyledNewsDiv = styled.div`
  width: calc(100% - 600px);
  height: 480px;
  display: flex;
  position: relative;

  flex-direction: column;
  align-items: center;

  padding-top: 0px;
`;
export const StyledBlurDiv = styled.div`
  width: calc(100%);
  height: 70px;
  position: absolute;
  left: 0px;
  bottom: -1px;
  background: ${(props) =>
    props.darkMode
      ? `linear-gradient(to top, transparent, 0%, #47484A, 50%, transparent)`
      : `linear-gradient(to top, transparent, 0%, white, 50%, transparent)`};
`;

export const StyledNewsKeyword = styled.div`
  width: 100%;
  font-size: 23px;
  text-align: start;
  margin-bottom: 20px;
  & span {
    font-weight: bold;
  }
  color: ${(props) => (props.darkMode ? "white" : "rgba(0, 0, 0, 0.7)")};
`;
export const StyledNewsItemParentDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  // gap: 5px;

  height: 480px;
  overflow-y: scroll;
  // padding: 20px 0px;

  & .youtube-title {
    font-weight: 400;
  }

  & a {
    text-decoration: none;
    color: inherit;
  }
`;

export const StyledNewsItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;

  width: 100%;
  background-color: ${(props) =>
    props.darkMode ? "rgb(65, 65, 65);" : "rgba(0, 0, 0, 0.02)"};
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  padding-bottom: 20px;
  color: ${(props) => (props.darkMode ? "white" : "rgba(0, 0, 0, 0.7)")};
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const StyledNewsItemHeaderDiv = styled.div`
  font-size: 0.7rem;
  margin-bottom: 10px;
  color: ${(props) => (props.darkMode ? "white" : "rgba(0, 0, 0, 0.7)")};

  & span:nth-child(1) {
    margin-right: 10px;
  }
  & span:nth-child(2) {
    margin-left: 10px;
  }
`;

export const StyledVideoDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledImageDiv = styled.div`
  & img {
    max-width: 180px;
    height: auto;
    border-radius: 10px;
  }
`;

export const StyledContentsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background-color: ${(props) => (props.darkMode ? "#282828" : "white")};
`;
