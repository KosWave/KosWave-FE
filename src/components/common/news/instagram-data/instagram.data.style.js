import styled from "styled-components";

export const StyledNewsDiv = styled.div`
  width: calc(100% - 600px);
  height: 430px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  padding: 15px;
  padding-top: 0px;
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
  gap: 5px;
  height: 450px;
  overflow-y: scroll;

  padding-top: 0px;
  position: relative;
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
export const StyledNewsItemDiv = styled.div`
  display: flex;
  gap: 20px;

  width: 100%;
  background-color: ${(props) =>
    props.darkMode ? "rgb(65, 65, 65);" : "rgba(0, 0, 0, 0.02)"};
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  padding-bottom: 20px;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.04);
  }

  & p {
    font-size: 0.8rem;
  }
  & #hashtags {
    margin-top: 10px;
    font-weight: 800;
  }
  & section > a {
    text-decoration: none;
    color: inherit;
  }
`;

export const StyledNewsItemHeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.7rem;
  margin-bottom: 10px;
  color: ${(props) => (props.darkMode ? "white" : "rgba(0, 0, 0, 0.7)")};

  & span:nth-child(1) {
    margin-right: 10px;
  }
  & span:nth-child(2) {
    margin-left: 10px;
  }
  & img {
    width: 15px;
  }
`;

export const StyledImageDiv = styled.div`
  & img {
    height: 200px;
    border-radius: 15px;
  }
`;
