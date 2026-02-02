import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  StyledSidebarDiv,
  StyledSidebarItemDiv,
  StyledHomeIcon,
  StyledAnalyzeIcon,
  StyledRelateIcon,
  StyledHeaderFillMoonIcon,
  StyledHeaderFillSunIcon,
  StyledSidebarInfoDiv,
  StyledToggleCircle,
  StyledToggleContainer,
  StyledBackdrop,
} from "./Sidebar.style";
import Logo from "../logo/Logo";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../../store/reducers/darkmode";
import { searchKeyword } from "../../../store/reducers/search";

import { closeSidebar } from "../../../store/reducers/sidebar";
import { AiOutlineClose } from "react-icons/ai";

export default function Sidebar() {
  const location = useLocation();
  const keyword = useSelector((state) => state.keyword.keyword);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();

  const [params, setParams] = useState(
    new URLSearchParams({
      name: keyword,
    }).toString()
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get("name");
    if (name) {
      dispatch(searchKeyword(name));
    }
  }, [location, dispatch]);

  useEffect(() => {
    setParams(
      new URLSearchParams({
        name: keyword,
      }).toString()
    );
  }, [keyword]);

  useEffect(() => {
    localStorage.setItem("darkmode", darkMode);
  }, [darkMode]);

  const isActive = (path) => {
    const url = new URL(window.location.href);
    return url.pathname + url.search === path;
  };

  const onClickDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <>
      <StyledBackdrop isOpen={isSidebarOpen} onClick={() => dispatch(closeSidebar())} />
      <StyledSidebarDiv darkMode={darkMode} isOpen={isSidebarOpen}>
        <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}>
          <Logo />
          <AiOutlineClose
            size={30}
            color={darkMode ? "white" : "black"}
            style={{ cursor: "pointer", display: isSidebarOpen ? "block" : "none" }}
            onClick={() => dispatch(closeSidebar())}
          />
        </div>
        <StyledSidebarInfoDiv>
          <div>
            <Link to={`/main?${params}`} onClick={() => dispatch(closeSidebar())}>
              <StyledSidebarItemDiv
                active={isActive(`/main?${params}`)}
                darkMode={darkMode}
              >
                <StyledHomeIcon />
                <span>한눈에 보기</span>
              </StyledSidebarItemDiv>
            </Link>
            <Link to={`/main/social?${params}`} onClick={() => dispatch(closeSidebar())}>
              <StyledSidebarItemDiv
                active={isActive(`/main/social?${params}`)}
                darkMode={darkMode}
              >
                <StyledAnalyzeIcon />
                <span>소셜 분석</span>
              </StyledSidebarItemDiv>
            </Link>
            <Link to={`/main/stock?${params}`} onClick={() => dispatch(closeSidebar())}>
              <StyledSidebarItemDiv
                active={isActive(`/main/stock?${params}`)}
                darkMode={darkMode}
              >
                <StyledRelateIcon />
                <span>연관 주식</span>
              </StyledSidebarItemDiv>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <StyledHeaderFillSunIcon
              darkmode={darkMode}
              onClick={onClickDarkMode}
            />
            <StyledToggleContainer
              isDarkMode={darkMode}
              onClick={onClickDarkMode}
            >
              <StyledToggleCircle isDarkMode={darkMode} />
            </StyledToggleContainer>
            <StyledHeaderFillMoonIcon
              darkmode={darkMode}
              onClick={onClickDarkMode}
            />
          </div>
        </StyledSidebarInfoDiv>
      </StyledSidebarDiv>
    </>
  );
}
