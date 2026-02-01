import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchKeyword } from "../../store/reducers/search";
import {
  StyledSearchDiv,
  StyledSearchInputDiv,
  StyledSearchInput,
  StyledSearchLogoImgDiv,
  StyledSearchIcon,
  StyledKeywordsParentDiv,
  StyledKeywordsDiv,
  StyledKeyword,
  HighlightedText,
  StyledLandingDiv,
  StyledHotKeyword,
} from "./Landing.Search.style";
import { useNavigate } from "react-router-dom";

export default function LandingSearch() {
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(false);
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.keyword.keyword);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const keywords = ["취업", "코스피", "반도체", "날씨", "롱패딩", "히터"];

  const onChangeText = (e) => {
    const { value } = e.target;
    setText(value);
    dispatch(searchKeyword(e.target.value));
    if (e.target.value.length > 0) setFocus(true);
  };

  const onClickKeyword = (text) => () => {
    setText(text);
    inputRef.current.focus();
  };

  const onKeyDownText = (e) => {
    if (e.key === "Enter") {
      setFocus(false);
      dispatch(searchKeyword(text));
      navigate(`/main?name=${text}`);
    }
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleClick = () => {
    dispatch(searchKeyword(text));
    navigate(`/main?name=${text}`);
  };

  return (
    <StyledLandingDiv>
      {/* <StyledCenterDiv> */}
      <StyledSearchDiv>
        <StyledSearchLogoImgDiv>
          <img src="/assets/images/logo4 (2).png" alt="Logo" />
        </StyledSearchLogoImgDiv>
        <StyledSearchInputDiv>
          <StyledSearchInput
            type="text"
            value={text}
            placeholder={focus ? "" : "관심있는 키워드를 입력하세요."}
            onChange={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            focus={focus}
            onKeyDown={onKeyDownText}
            ref={inputRef}
          />
          <StyledSearchIcon visible={true} onClick={handleClick} />
          <StyledKeywordsDiv>
            <StyledHotKeyword>
              <p>이번 주 HOT</p>
            </StyledHotKeyword>
            <StyledKeywordsParentDiv>
              {keywords.map((keyword, index) => (
                <StyledKeyword
                  className="keyword"
                  key={index}
                  onClick={onClickKeyword(keyword)}
                >
                  <span>{keyword}</span>
                </StyledKeyword>
              ))}
            </StyledKeywordsParentDiv>
          </StyledKeywordsDiv>
        </StyledSearchInputDiv>
      </StyledSearchDiv>
      {/* </StyledCenterDiv> */}
    </StyledLandingDiv>
  );
}
