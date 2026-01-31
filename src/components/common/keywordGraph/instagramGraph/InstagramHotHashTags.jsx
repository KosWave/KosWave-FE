import React, { useState } from "react";
import {
  StyledHotHashTag,
  generateRandomGradient,
} from "./InstagramHotHashTag.style";

export default function InstagramHotHashTags({ topTags }) {
  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        gap: "10px",
      }}
    >
      {topTags && topTags.length > 0
        ? topTags.slice(0, 3).map((item, index) => {
            const gradient = generateRandomGradient();
            return (
              <StyledHotHashTag key={index} gradient={gradient}>
                # {item}
              </StyledHotHashTag>
            );
          })
        : null}
    </div>
  );
}
