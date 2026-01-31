import styled , {keyframes, css} from "styled-components";

// @keyframes 애니메이션을 별도로 정의
const animate = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-6px);
  }
`;

const animate_click = keyframes`
  0% {
    transform: translateX(0) scale(1);
  }
  100% {
    transform: translateX(-400px) translateY(80px) scale(0.75);
  }
`;

const animate_tab = keyframes`
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
     opacity: 1;
  }
`;

const animate_fadeout = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(50px);
     opacity: 0;
  }
`;

export const StyledHeadTitleBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  margin-left: 50px;

${(props) =>
  props.animate &&
  css`
    animation: ${animate_fadeout} 0.6s ease-in-out forwards;
    animation-fill-mode: forwards; /* 애니메이션 후 상태 유지 */
  `}  

`

export const StyledRelatedKeywordContainer = styled.div`
    color: ${(props) => (props.darkMode ? "white" : "rgba(0, 0, 0, 0.7)")};
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    position: relative;    
`

export const StyledBubbleContainer = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 70%;
`

export const StyledCircleContainer = styled.div`
    position: relative;
    top: 90px;
    margin: 50px auto;
    ${props => props.move &&
    css`animation: ${animate_click} 1s ease-in-out forwards;
    `}
`

export const StyledCircleItem = styled.div`
    width: ${(props) => props.width};
    position: absolute;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    left: ${( props ) => `calc(50% + ${props.x}px - ${parseInt(props.distance)*0.5}px)`};
    top: ${( props ) => `calc(50% + ${props.y}px - ${parseInt(props.distance)*0.5}px)`};
    animation: ${animate} ${(props) => props.time || '2s'} ${(props) => props.delay || '2s'} ease-in-out infinite alternate;
  cursor: pointer;
`

export const StyledMiniCircleItem = styled.div`
    position: absolute;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    left: ${(props) => `calc(50% + ${props.x}px - ${parseInt(props.distance)*0.5}px)`};
    top: ${(props) => `calc(50% + ${props.y}px - ${parseInt(props.distance)*0.5}px)`};
    animation: ${animate} ${(props) => props.time || '2s'} ${(props) => props.delay || '2s'} ease-in-out infinite alternate;
  cursor: pointer;
    
`

export const StyledKeyCircleItem = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;    
`

export const StyledNewsContainer = styled.div`
    position: absolute;
    right: 7vw;
    border: 1px;
    width: 45%;
`

export const StyledNewsTab = styled.div`
    /* position: absolute;
    right: 0; */    
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const StyledTitleBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  opacity: 0;

${(props) =>
  props.animate &&
  css`
    animation: ${animate_tab} 0.6s ease-in-out forwards;
    animation-delay: 0.8s;
    animation-fill-mode: forwards; /* 애니메이션 후 상태 유지 */
  `}  

`

export const StyledNaverbox = styled.div`
    opacity: 0; /* 처음에 숨김 */
    background-color: ${(props) => (props.darkMode ? "#333333" : "white")};
    
    border-radius: 20px;
    box-shadow: 8px 20px 30px 0px rgb(0, 0, 0, 0.04);
    margin-bottom: 10vh;
    padding: 5px;

    ${(props) =>
      props.animate &&
      css`
        animation: ${animate_tab} 0.6s ease-in-out forwards;
        animation-delay: 0.4s;
        animation-fill-mode: forwards; /* 애니메이션 후 상태 유지 */
      `}  
    
`

export const StyledGraphBox = styled.div`
    background-color: ${(props) => (props.darkMode ? "#333333" : "white")};
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0px 10px 14px 0px rgb(0, 0, 0, 0.04);
    opacity: 0;
    position: relative;

    ${(props) =>
      props.animate &&
      css`
        animation: ${animate_tab} 0.6s ease-in-out forwards;
        animation-delay: 0.5s;
        animation-fill-mode: forwards; /* 애니메이션 후 상태 유지 */
      `}  
`

export const StyledInfoIcon = styled.div`
  position: absolute;
    right: 70px;
    cursor: pointer;
    z-index: 1;
    top: -0.5px;

  /* img 요소에 호버 시 #tag 요소가 보이도록 설정합니다. */
  &:hover #tag {
    visibility: visible;
    opacity: 1;
  }

  & #tag {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${props => props.darkMode ? '#000000ad' : '#f0f1f3'};
    padding: 8px;
    border: ${props => props.darkMode ? '1px solid rgb(0 0 0 / 62%)' : '1px solid rgba(187,195,192,1)'};
    border-radius: 5px;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0.3s, opacity 0.3s;
  
    height: 100px;
    width: 400px;
    font-size: 0.9rem;
  }


`;

export const StyledGraphKeyword = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 2%;
    padding: 5px;
    width: 100%;
    background-color: ${(props) => (props.darkMode ? "#252a33" : "rgb(67,210,255,1)")};
    box-shadow: ${(props) => (props.darkMode ? "0 0 0 5px rgba(0, 0, 0, 0.15)" : "0 0 0 5px rgb(45,202,255)")};
    text-align: center;
    font-size: 1.1rem;
    color: white;
    border-radius: 20px;
    box-shadow: 8px 20px 30px 0px rgb(0, 0, 0, 0.04);
& #related-news-count {
background-color: rgb(41 239 140 / 76%);
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 40px;
}

`

export const StyledRelatedKeyword = styled.div`
  width: 100%;
  font-size: 23px;
  & span {
    font-weight: bold;
  }
`;