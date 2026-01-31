import styled, {keyframes,css} from "styled-components";

// const bubbleBurst = keyframes`
//   0% {
//     transform: scale(1);
//     opacity: 1;
//   }  
//   50% {
//     transform: scale(1.2) ;
//     opacity: 0.8;
//   }
//   95% {
//     transform: scale(1.4) ;
//     opacity: 0.3;
//   }
//   100% {
//     transform: scale(1.5) ;
//     opacity: 0;
//   }
  
// `;

const lightGradient = 'radial-gradient(circle, white 0%, white 30%, rgba(196, 196, 196, 0.1) 40%, #bfe9f6 90%, #bfe9f6 100%)';
const darkGradient = 'radial-gradient(circle, #ffffffeb 0%, #ecfeffd1 30%, rgb(226 250 255 / 81%) 40%, #bfe9f6 90%, #bfe9f6 100%)';


export const StyledBubbleDiv = styled.div`
  /* display: ${(props) => (props.iscurrent ? "none" : "flex" || "flex")};; */
  display: flex;
  width: ${(props) => props.width || "100px"};
  height: ${(props) => props.height || "100px"};
  /* opacity 값 설정 */
  opacity: ${(props) => (props.iscurrent ? "1" : props.opacity || "1")};

  background: ${(props)=>(props.darkMode? darkGradient
  : lightGradient)
  || "radial-gradient(circle, white 0%, white 30%, rgba(196, 196, 196, 0.1) 40%, #bfe9f6 90%, #bfe9f6 100%)"};
  
    
  /* background: radial-gradient(
    circle,
    white 0%,
    white 30%,
    rgba(196, 196, 196, 0.1) 40%,
    #bfe9f6 90%,
    #bfe9f6 100%
  ); */
  border: none;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  position: relative;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03); */
  /* font-size: ${(props) => parseInt(props.width || "100px") * 0.12}px; */
  font-size: ${(props) => props.fontsize || "1rem"} !important;
  color: #2a5676;

  

  &:before {
    content: "";
    width: calc(${(props) => props.width || "100px"} * 0.35);
    height: calc(${(props) => props.height || "100px"} * 0.13);
    filter: blur(2px);
    background: white;
    position: absolute;
    opacity: 0.6;
    top: calc(${(props) => props.height || "100px"} * 0.08);
    left: calc(50% - ${(props) => parseInt(props.width || "100px") * 0.35}px);
    transform: rotate(-27deg);
    border-radius: 50%;
    z-index: 2;
  }

  &:after {
    content: "";
    width: calc(${(props) => props.width || "100px"} * 0.43);
    height: calc(${(props) => props.height || "100px"} * 0.1);
    filter: blur(3px);
    background-color: #ccf3ff;
    position: absolute;
    opacity: 0.6;
    top: calc(${(props) => props.height || "100px"} * 0.01);
    left: calc(50% - ${(props) => parseInt(props.width || "100px") * 0.2}px);
    border-radius: 50%;
  }

  &:hover {
    cursor: ${props => props.iscurrent ? "default" : "pointer"};
    opacity: 1; 
  }
  
  #content {
    flex-wrap: wrap;
    padding: 10px;
    text-align: center
  }
`;
