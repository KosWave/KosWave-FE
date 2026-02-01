import React from "react";
import { MutatingDots } from 'react-loader-spinner';
import { StyledLoadingDiv } from "./Loading.style";

export default function Loading() {
  return (
    <StyledLoadingDiv className="loader-container">
      <MutatingDots
        height={80}
        width={80}
        color= "#E56717"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        secondaryColor="#9ae7ff"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </StyledLoadingDiv>
  );
}
