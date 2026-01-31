import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  StyledSidebarDiv,
  StyledSidebarItemDiv,
  StyledHomeIcon,
  StyledAnalyzeIcon,
  StyledRelateIcon,
  StyledKeywordIcon,
  StyledHeaderFillMoonIcon,
  StyledHeaderFillSunIcon,
  StyledSidebarInfoDiv,
  StyledToggleCircle,
  StyledToggleContainer,
} from "./Sidebar.style";
import Logo from "../logo/Logo";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../../store/reducers/darkmode";
import { searchKeyword } from "../../../store/reducers/search";

export default function Sidebar() {
  const location = useLocation();
  const keyword = useSelector((state) => state.keyword.keyword);
  const darkMode = useSelector((state) => state.theme.darkMode);
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
    <StyledSidebarDiv darkMode={darkMode}>
      <div>
        <Logo />
      </div>
      <StyledSidebarInfoDiv>
        <div>
          <Link to={`/main?${params}`}>
            <StyledSidebarItemDiv
              active={isActive(`/main?${params}`)}
              darkMode={darkMode}
            >
              <StyledHomeIcon />
              <span>한눈에 보기</span>
            </StyledSidebarItemDiv>
          </Link>
          <Link to={`/main/social?${params}`}>
            <StyledSidebarItemDiv
              active={isActive(`/main/social?${params}`)}
              darkMode={darkMode}
            >
              <StyledAnalyzeIcon />
              <span>소셜 분석</span>
            </StyledSidebarItemDiv>
          </Link>
          <Link to={`/main/stock?${params}`}>
            <StyledSidebarItemDiv
              active={isActive(`/main/stock?${params}`)}
              darkMode={darkMode}
            >
              <StyledRelateIcon />
              <span>연관 주식</span>
            </StyledSidebarItemDiv>
          </Link>
          <Link to={`/main/keyword?${params}`}>
            <StyledSidebarItemDiv
              active={isActive(`/main/keyword?${params}`)}
              darkMode={darkMode}
            >
              <StyledKeywordIcon />
              <span>연관 키워드</span>
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
  );
}
