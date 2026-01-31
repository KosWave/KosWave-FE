import React from "react";

import {
  StyledTitleDiv,
  YoutubeContent,
  InstagramContent,
  StyledMainContentDiv,
} from "./RelatedSns.style";
import ContentHeader from "./contents-item/ContentHeader";
import YoutubeVideo from "./contents-item/YoutubeVideo";
import Instagram from "./contents-item/Instagram";
import { useSelector } from "react-redux";
export default function RelatedSns({ keyword }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <StyledMainContentDiv darkMode={darkMode}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <ContentHeader
          imgUrl="/assets/images/total-sns.png"
          keyword={keyword}
          description="에 대한 SNS 반응이에요."
          toLink="/main/social"
        />
        <StyledTitleDiv>"{keyword}" 에 대한 유튜브 반응</StyledTitleDiv>
        <YoutubeContent darkMode={darkMode}>
          <YoutubeVideo keyword={keyword} />
        </YoutubeContent>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <StyledTitleDiv>"{keyword}" 에 대한 인스타그램 반응</StyledTitleDiv>
        <InstagramContent darkMode={darkMode}>
          <Instagram keyword={keyword} />
        </InstagramContent>
      </div>
    </StyledMainContentDiv>
  );
}
