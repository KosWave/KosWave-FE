import styled from 'styled-components'


export const CustomCloseButton = styled.button`
  position: absolute;
  top: 5px; 
  right: 25px; 
  color: ${(props) => (props.darkMode ? "white" : "black")};
  border: none;
  background: none;
  font-size: 2.5rem;  // Increase font size for larger button
  cursor: pointer;
  
  &:hover {
    color: #43D2FF; // Change to the color you want on hover
  }
`;