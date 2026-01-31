// Bubble.js
import { StyledBubbleDiv } from "./KeywordBubble.style";
import { useSelector } from "react-redux";

export default function Bubble(props) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <StyledBubbleDiv
      darkMode = {darkMode}
      width={props.width}
      height={props.height}
      opacity={props.opacity}
      fontsize={props.fontsize}
      onClick={(e)=>props.clickfunc(e)}
      iscurrent={props.iscurrent}
      id={props.id}
    >
    <span id="content">{props.content}</span> 
    </StyledBubbleDiv>
  );
}
