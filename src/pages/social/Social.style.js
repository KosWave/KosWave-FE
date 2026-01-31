import styled from "styled-components";

export const StyledSocialDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const StyledSocialInfoDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  background-color: ${(props) => (props.darkMode ? "#282828" : "#F9FCFF")};
`;
