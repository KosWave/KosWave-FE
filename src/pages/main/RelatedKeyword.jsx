import React from "react";
import ContentHeader from "./contents-item/ContentHeader";
import { relatedKeywordAPI } from "../../lib/apis/RelatedKeyword";
import {
  StyledCircleContainer,
  StyledKeyCircleItem,
  StyledCircleItem,
  StyledMiniCircleItem,
} from "../../components/common/bubble-relatedkeyword/RelatedKeyword.style";
import Bubble from "../../components/common/bubble/KeywordBubble";
import { useQuery } from "react-query";
import {
  StyledMainContentDiv,
  StyledBubbleContainer,
} from "./RelatedKeyword.style";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";

export default function RelatedKeyword({ keyword }) {
  const big_radius = 160; // 반지름
  const sml_radius = 93;
  const angleStep = 360 / 6;
  const key_bubble_size = "90px";
  const bubble_size = "120px";
  const mini_bubble_size = "70px";
  const darkMode = useSelector((state) => state.theme.darkMode);
  const {
    data: relatedKeywordData,
    isLoading: isLoadingKeyword,
    error: errorKeyword,
  } = useQuery(
    ["relatedkeywordData", keyword],
    () => relatedKeywordAPI({ keyword }),
    {
      staleTime: Infinity,
    }
  );

  if (isLoadingKeyword)
    return (
      <StyledMainContentDiv darkMode={darkMode}>
        <ContentHeader
          imgUrl="/assets/images/bell.svg"
          keyword={keyword}
          description="와(과) 함께 언급되는 단어에요"
          toLink="/main/keyword"
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <ClipLoader color="#43d2ff" />
        </div>
      </StyledMainContentDiv>
    );
  if (errorKeyword)
    return (
      <StyledMainContentDiv darkMode={darkMode}>
        <ContentHeader
          imgUrl="/assets/images/bell.svg"
          keyword={keyword}
          description="와(과) 함께 언급되는 단어에요"
          toLink="/main/keyword"
          darkMode={darkMode}
        />
        {darkMode ? (
          <img
            style={{ width: "700px", height: "auto", marginTop: "50px" }}
            src="/assets/images/no-data-darkmode.svg"
          ></img>
        ) : (
          <img
            style={{ width: "700px", height: "auto", marginTop: "50px" }}
            src="/assets/images/no-data.svg"
          ></img>
        )}
      </StyledMainContentDiv>
    );

  return (
    <>
      <StyledMainContentDiv darkMode={darkMode}>
        <ContentHeader
          imgUrl="/assets/images/bell.svg"
          keyword={keyword}
          description="와(과) 함께 언급되는 단어에요"
          toLink="/main/keyword"
          darkMode={darkMode}
        />
        <StyledBubbleContainer darkMode={darkMode}>
          {isLoadingKeyword ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: darkMode ? "#333333" : "white",
              }}
            >
              <ClipLoader color="#43d2ff"></ClipLoader>
            </div>
          ) : errorKeyword ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: darkMode ? "#333333" : "white",
              }}
            >
              <img
                style={{ width: "450px", height: "280px" }}
                src="/assets/images/no-data-box.svg"
              ></img>
            </div>
          ) : (
            <Link to="/main/keyword">
              <StyledCircleContainer id="circle-container">
                <StyledKeyCircleItem>
                  <Bubble
                    content={keyword}
                    width={key_bubble_size}
                    height={key_bubble_size}
                    fontsize={"1.5rem"}
                    nothover={true}
                  />
                </StyledKeyCircleItem>

                {relatedKeywordData.data.slice(0, 6).map((item, index) => {
                  const angle = index * angleStep;
                  const radian = (angle * Math.PI) / 180;
                  const x = big_radius * Math.cos(radian);
                  const y = big_radius * Math.sin(radian);

                  return (
                    <StyledCircleItem
                      key={index}
                      x={x}
                      y={y}
                      distance={bubble_size}
                      time={"1.3s"}
                      delay={`${index * 0.5}s`}
                    >
                      <Bubble
                        id={`big-bubble-${index}`}
                        content={item.label}
                        width={bubble_size}
                        height={bubble_size}
                        fontsize={"1.7rem"}
                      />
                    </StyledCircleItem>
                  );
                })}

                {relatedKeywordData.data.slice(6, 12).map((item, index) => {
                  const angle = index * angleStep;
                  const radian = (angle * Math.PI) / 180;
                  const x = sml_radius * Math.cos(radian + Math.PI / 6);
                  const y = sml_radius * Math.sin(radian + Math.PI / 6);

                  return (
                    <StyledMiniCircleItem
                      key={index}
                      x={x}
                      y={y}
                      distance={mini_bubble_size}
                      time={"1s"}
                      delay={`${index * 0.5}s`}
                    >
                      <Bubble
                        id={`sml-bubble-${index}`}
                        content={item.label}
                        width={mini_bubble_size}
                        height={mini_bubble_size}
                        fontsize={"1.3rem"}
                      />
                    </StyledMiniCircleItem>
                  );
                })}
              </StyledCircleContainer>
            </Link>
          )}
        </StyledBubbleContainer>
      </StyledMainContentDiv>
    </>
  );
}
