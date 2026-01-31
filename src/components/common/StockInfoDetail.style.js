import styled from "styled-components";

export const StyledInfoDetailDiv = styled.div`
  width: 25%;
  ascpect-ratio: 1/1;
  background-color: lightgray;
  border-radius: 10px;
  color: black;
  padding: 10px;
  h3 {
    font-size: 18px;
  }
  div {
    display: flex;
    flex-direction: row;
  }
  div p:first-child {
    color: gray;
    width: 30%;
  }
  span {
    font-weight: normal;
    color: gray;
  }
`;
