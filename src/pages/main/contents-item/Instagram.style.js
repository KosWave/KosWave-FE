import styled from 'styled-components';
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
`;

export const Image = styled.img`
  height: 50px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Number = styled.span`
  font-size: 2em;
  font-weight: bold;
  background: linear-gradient(90deg, #FF049A, #2F0DFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Label = styled.span`
  color: ${(props) => (props.darkMode ? "white" : "#555")};
  font-size: 15px;
`;
