import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
export const FlexContainer = styled.div`
  display: flex;
  justify-content:center;
  margin-left:20px;
  margin-bottom:20px;
  margin-top:20px;
  gap:10px;
  position: relative;
  
`;

// 라벨
export const Label = styled.label`
  color:${(props) => (props.darkMode ? "white" : "black")};
  margin-right: 10px;
  font-weight: bold;
  margin-top:7px;
`;

// 날짜 입력
export const StyledInput = styled.input`
  padding: 8px;
  font-size: 16px;
  border:${(props) => (props.darkMode ? "none" : "1px solid #ccc")};
  border-radius: 4px;
  margin-right: 10px;
  color:${(props) => (props.darkMode ? "white" : "black")};
  background-color:${(props) => (props.darkMode ? "#47484A" : "white")};
`;
export const CustomTabs = styled(Nav)`
  .nav-link {
    color: ${(props) => (props.darkMode ? "white" : "black")};
    &:hover {
      background-color: #43D2FF;
      color:white
    }
    &.active {
      color: white;
      background-color:#43D2FF;
      
    }
  }
`;

