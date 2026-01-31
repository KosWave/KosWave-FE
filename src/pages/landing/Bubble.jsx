import React, { useState } from "react";
import { StyledBubble } from "./Bubble.style";


export default function Bubble({ width, height, top, left, time }) {
  const [isPopped, setIsPopped] = useState(false);

  const handleClick = () => {
    setIsPopped(true);
    setTimeout(() => {
      setIsPopped(false);
    }, 2000);
  };

  return (
    <StyledBubble
      width={width}
      height={height}
      top={top}
      left={left}
      time={time}
      pop={isPopped}
      onClick={handleClick}
    />
  );
}
