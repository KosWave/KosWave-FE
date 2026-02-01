import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';


export const Container = styled.div`
  display: flex;
  height: 100vh;  
  width: 100vw;  
`;


export const Content = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${(props) => (props.darkMode ? "#282828" :"")};
`;


export const ChartSection = styled.div`
    flex: 0 0 auto; 
    justify-content: center;
    height: 335px;
    display: flex;
    gap:160px;
    align-items: center;
    position:relative;
    
    .header-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        // margin-left: 150px;
    }

    .chart-image {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

    }

  
`;


export const TabsSection = styled.div`
  flex: 1 1 auto;  // 이 섹션은 가변 크기로 설정합니다.
 
`;


export const CustomTabs = styled(Nav)`
  width: 100%;
  border-bottom: 1px solid #959595;

  .nav-link {
    color: ${(props) => (props.darkMode ? "white" : "black")};
    &:hover {
      border-bottom: 2px solid #077DF3;
      color: #077DF3;
    }
    &.active {
      border-bottom: 2px solid #077DF3;
      color: #077DF3;
    }
  }
`;

export const StockStatus=styled.div`
  color: #8F9293;
  margin-left: 10px;
  

`
export const StyledChangeRate = styled.span`
    font-size: 14px;
    font-weight: 600;
    ${({ color }) => `color: ${color};`}
`;
export const PriceContent=styled.div`
  color: ${(props) => (props.darkMode ? "white" : "black")};
  display: flex;
  align-items: center;
  flex-direction: column;
`
export const LinkTo=styled.span`
  position:absolute;
  right:0;
  top:0;
  margin-top:30px;
  margin-right:15px;
  border-radius:10px;
  padding:5px 10px;
  cursor:pointer;
  color: ${(props) => (props.darkMode ? "#F2F2F2" : "#00537a")};
  transition: filter 0.3s ease-in-out;
  &:hover {
    filter: ${(props) => (props.darkMode ? "drop-shadow(0 0 3px #E56717)" : "drop-shadow(0 0 3px rgba(0, 83, 122, 0.8))")};
  }

`

export const GlowIcon = styled.div`
  display: flex;
  margin-top:15px;
  color: ${(props) => (props.darkMode ? "#F2F2F2" : "#00537a")};
  transition: filter 0.3s ease-in-out;
  cursor:pointer;
  svg {
    width: 40px;
    height: 40px;
   
    &:hover {
      filter: ${(props) => (props.darkMode ? "drop-shadow(0 0 3px #E56717)" : "drop-shadow(0 0 3px rgba(0, 83, 122, 0.8))")};
    }
  }
  span{
    margin-top:4px;
    font-size:23px;
    font-weight: bold;
    font-style:italic;
    &:hover {
     
      filter: ${(props) => (props.darkMode ? "drop-shadow(0 0 3px #E56717)" : "drop-shadow(0 0 3px rgba(0, 83, 122, 0.8))")};
    }
  }
`;