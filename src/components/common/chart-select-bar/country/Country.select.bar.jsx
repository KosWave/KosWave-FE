import { useState } from "react";
import { StyledNav, StyledNavItem } from "./Country.style";

export default function CountrySelectBar() {
  const [selected, setSelected] = useState("전세계");
  const period = ["전세계", "대한민국"];

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
