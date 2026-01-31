import styled from "styled-components";
import {Link} from 'react-router-dom';
export const NewsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top:10px;
`;

export const NewsItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid #ddd;
`;

export const NewsImage = styled.img`
  width: 103px;
  min-width:103px;
  height: 75px;
  object-fit: cover;
  margin-left:10px;
  border-radius: 5px;
  margin-bottom:10px;
  background-color:#ECFAFF;
`;

export const NewsDetails = styled.div`
  display: flex;
  margin-left:20px;
  flex-direction: column;
`;

export const NewsTitle = styled.h2`
  color: ${(props) => (props.darkMode ? "white" : "black")};
  font-size: 16px;
  margin: 0;
`;

export const NewsDateOffice = styled.div`
  color: ${(props) => (props.darkMode ? "#555" : "#9FA4A6")};
  margin-top:5px;
  font-size: 13px;
`;

export const NewsContent=styled.div`
    font-size:14px;
    color:#555;
    color: ${(props) => (props.darkMode ? "#9FA4A6" : "#555")};
`

export const StyledLink = styled(Link)`
  text-decoration: none; 
  color: inherit; 
  &:hover {
    text-decoration: none; 
    opacity: 0.8; 
    ${NewsTitle} {
      color: #43D2FF;
    }

  }
`;
