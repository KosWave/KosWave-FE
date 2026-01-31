import React from "react";
import { StyledLogoImg } from "./Logo.style";
import { useSelector } from "react-redux";
export default function Logo({size}) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <a href="/">
      <StyledLogoImg size={size} src={darkMode? "/assets/images/logo4 (2).png": "/assets/images/white-logo.png"} />
    </a>
  );
}
