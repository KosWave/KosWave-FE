import styled from "styled-components";

// 메인 컨테이너 스타일
export const StyledMainTabDiv = styled.div`
   
    
`;

// 테이블 스타일
export const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    margin-top: 10px;
    
    
`;

export const Th = styled.th`
    background-color: ${(props) => (props.darkMode ? "#47484A" : " #F1FCFF")};
    // background-color: #F1FCFF;
    /* 제목 셀 하단에만 경계선 추가 */
    padding: 12px;  
    text-align: center;
    font-weight: bold;
    color: ${(props) => (props.darkMode ? "white" : " black")};
`;

export const Td = styled.td`
    border-bottom: ${(props) => (props.darkMode ? "2px solid #ADAEAE" : " 2px solid #ddd")};
    padding: 8px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color:${(props) => (props.darkMode ? "white" : " balck")};
`;

export const Thead = styled.tbody`
   background-color:#ff;
    
`;

export const Tbody = styled.tbody`
    background-color: #ff;
    
`;
