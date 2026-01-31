import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";

export const StyledLandingDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;


export const StyledSearchDiv = styled.div`
  width: 100%;
  padding-top: 35px;
  padding-bottom: 35px;
  padding-right: 20px;
  padding-left: 20px;
  border-radius: 70px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.36);
  box-shadow: 0px 0px 10px 10px rgba(49, 136, 164, 0.09);
  display: flex;
  flex-direction: column;
  align-items: center;
  
  backdrop-filter: blur(5px); /* 또는 filter: blur(8px); */
`;

export const StyledSearchLogoImgDiv = styled.div`
  opacity: 1;
  & img {
    opacity: 1;
  }
  z-index: 1;
  padding: 10px;
`;

export const StyledSearchInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  opacity: 1;
  width: 80%;
  gap: 25px;

`;

export const StyledSearchInput = styled.input`
  width: 100%;
  height: 58px;
  line-height: 2.8rem;
  border-radius: 50px;
  border: 2px solid rgba(255,255,255, 0.1);
  text-align: center;
  opacity: 1;
  font-size: 17px;
  background-color: rgba(255,255,255,0.4);

  &::placeholder {
    padding-left: 20px;
  }

  
`;

export const StyledSearchIcon = styled(IoSearchOutline)`
  position: absolute;
  font-size: 1.4rem !important;
  color: rgba(0, 0, 0, 0.5);
  right: 5%;
  top: 8%;
  cursor: pointer;
  :hover {
    color: #43D2FF;
  }
`;

export const StyledKeywordsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  opacity: 1;
  flex-wrap: nowrap;

  & > div:first-child {
    margin-bottom: 10px;
  }
`;
export const StyledKeywordsParentDiv = styled.div`
  width: 100%;
  display: flex;  
  gap: 20px;
  justify-content: center; /* 가운데 정렬 */
  text-align: center;
  line-height: 2.3;
  flex-flow: row wrap; /* 줄바꿈 행을 래핑하도록 설정 */
`;

export const StyledHotKeyword = styled.div`
  width: 130px;
  height: 40px;
  padding: 20px;
  margin-left: 20px;
  line-height: 0.1;

  text-align: center;
  white-space: nowrap;
  border-radius: 20px;
  background: linear-gradient(90deg, rgba(19, 227, 255, 1), rgba(3, 132, 250, 0.7), rgba(106, 120, 244, 0.9));
  color: white;
  font-weight: 700;
& p {
}
`;

export const StyledKeyword = styled.span`
  width: 25%;
  padding-left: 8px;
  padding-right: 8px;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트 생략기호 표시 */
  background-color: rgba(255, 255, 255, 0.55);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.04);
  /* margin: 5px 20px; */
  color: #025592;
  cursor: pointer;

  & > span {
  }
`;

export const HighlightedText = styled.span`
  color: #025592;
`;
