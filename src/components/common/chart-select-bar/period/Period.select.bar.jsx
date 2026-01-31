import { useState } from "react";
import { StyledNav, StyledNavItem } from "./Period.style";
import { useSelector } from "react-redux";

export default function PeriodSelectBar(props) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [selected, setSelected] = useState("7일");
  const period = ["7일", "30일", "1년", "5년"];

  const handlePeriodClick = (period) => {
    setSelected(period);
    props.handlePeriodChange(period);
  };

  return (
    <StyledNav>
      {period.map((e, index) => (
        <StyledNavItem
          key={index}
          active={selected === e}
          onClick={() => handlePeriodClick(e)}
          darkMode={darkMode}
        >
          {e}
        </StyledNavItem>
      ))}
    </StyledNav>
  );
}
