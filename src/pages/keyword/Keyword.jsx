import React from "react";
import { useRef } from "react";
import RelatedKeyword from "../../components/common/bubble-relatedkeyword/RelatedKeyword";
import Sidebar from "../../components/common/sidebar/Sidebar";
import Header from "../../components/common/header/Header";
import { StyledSocialDiv, StyledSocialInfoDiv } from "../social/Social.style";
import { StyledKeywordDiv } from "./Keyword.style";
import { useSelector } from "react-redux";

export default function KeywordPage() {
  const scrollRef = useRef(null);
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <StyledSocialDiv>
      <Sidebar />
      <StyledKeywordDiv darkMode={darkMode}>
        <div>
           <Header />
        </div>
        <RelatedKeyword></RelatedKeyword>
      </StyledKeywordDiv>
    </StyledSocialDiv>
  );
}
