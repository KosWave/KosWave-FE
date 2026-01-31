import styled from "styled-components";

export const StyledNewsDiv = styled.div`
  width: calc(100% - 600px);
  height: 470px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 0px;
  position: relative;
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
export const StyledBlurDiv = styled.div`
  width: calc(100%);
  height: 70px;
  left: 0px;
  position: absolute;
  bottom: -1px;
  background: ${(props) =>
    props.darkMode
      ? `linear-gradient(to top, transparent, 0%, #47484A, 50%, transparent)`
      : `linear-gradient(to top, transparent, 0%, white, 50%, transparent)`};
`;
export const StyledNewsItemPatentDiv = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  margin-bottom: 0px;
`;

export const StyledNewsItemDiv = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.02);
  background-color: ${(props) =>
    props.darkMode ? "rgb(65, 65, 65);" : "rgba(0, 0, 0, 0.02)"};
  padding: 20px;

  border-radius: 10px;
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
export const StyledContentsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background-color: ${(props) => (props.darkMode ? "#282828" : "white")};
  margin-bottom: 5px;
`;
