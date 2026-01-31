import { useState } from "react";
import { StyledNav, StyledNavItem } from "./Blog.News.style";

export default function BlogNewsBar() {
  const [selected, setSelected] = useState("블로그");
  const period = ["블로그", "뉴스"];

  const handlePeriodClick = (period) => {
    setSelected(period);
  };

  return (
    <StyledNav>
      {period.map((e, index) => (
        <StyledNavItem
          key={index}
          active={selected === e}
          onClick={() => handlePeriodClick(e)}
        >
          {e}
        </StyledNavItem>
      ))}
    </StyledNav>
  );
}
