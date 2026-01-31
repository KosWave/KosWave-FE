import React, { useState, useEffect } from "react";
import {
  StyledHeaderInput,
  StyledHeaderInputDiv,
  StyledSearchIcon,
} from "./Search.style";
import { useSelector, useDispatch } from "react-redux";
import { searchKeyword } from "../../../store/reducers/search";
import { useNavigate } from "react-router-dom";

export default function Search(props) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.keyword.keyword);
  const navigate = useNavigate();
  const [text, setText] = useState(() => {
    return localStorage.getItem("searchKeyword") || keyword;
  });

  useEffect(() => {
    if (keyword) {
      setText(keyword);
      localStorage.setItem("searchKeyword", keyword);
    }
  }, [keyword]);

  const onChangeKeyword = (e) => {
    setText(e.target.value);
  };

  const onkeydownKeyword = (e) => {
    if (e.key === "Enter") {
      if (text === "") return;
      dispatch(searchKeyword(e.target.value));
      localStorage.setItem("searchKeyword", e.target.value);

      const params = new URLSearchParams({
        name: e.target.value,
      });
      navigate(`.?${params.toString()}`);
    }
  };
  const onClickSearch=()=>{
    if(text==="") return;
    dispatch(searchKeyword(text));
    localStorage.setItem("searchKeyword", text);
    const params = new URLSearchParams({
      name: text,
    });
    navigate(`.?${params.toString()}`);
  }

  return (
    <StyledHeaderInputDiv>
      <StyledHeaderInput
        placeholder="Search"
        width={"900px"}
        height={"50px"}
        value={text}
        onChange={onChangeKeyword}
        onKeyDown={onkeydownKeyword}
        darkMode={darkMode}
      />
      <StyledSearchIcon onClick={onClickSearch}/>
    </StyledHeaderInputDiv>
  );
}
