import { createPortal } from "react-dom";
import React, { useEffect, useState, useRef } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  StyledContentsDiv,
  StyledContentsTitleGroup,
  StyledContentsTitle,
  StyledContentsMiniTitle,
  StyledTooltip,
  StyledTooltipTitle,
} from "./Contents.style";
import apiClient from "~/utils/axios";
import { useSelector } from "react-redux";

export default function StockContent(props) {
  const company = props.company;
  const companyCode = company.code;
  const companyName = company.name;
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [ratePerYesterday, setRatePerYesterday] = useState(0);
  const [signPerYesterday, setsignPerYesterday] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          `/api/current-price?symbol=${companyCode}`
        );
        setRatePerYesterday(response.data.output.prdy_ctrt);
        setsignPerYesterday(response.data.output.prdy_vrss_sign - 3);
      } catch (error) {
        console.error("Error fetching the news:", error);
      }
    };
    fetchData();
  }, [props.companyCode]);

  /* const handleDivClick = () => {
    navigate(`/main/stocks/detail/?code=${companyCode}&name=${companyName}`);
  }; */

  const handleMouseEnter = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPos({
        top: rect.bottom + 10, // 10px below the element
        left: rect.left + rect.width / 2 - 200 // center the tooltip (400px / 2 = 200)
      });
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    // !! div에 key값 붙여주세요. (redux 구현 후)
    <StyledContentsDiv
      ref={containerRef}
      width={props.width}
      height={props.height}
      // onClick={handleDivClick}
      darkMode={darkMode}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StyledContentsTitleGroup>
        <StyledContentsTitle>{companyName}</StyledContentsTitle>
        <StyledContentsMiniTitle
          key={companyCode}
          signperyesterday={signPerYesterday}
          darkMode={darkMode}
        >
          <p>({ratePerYesterday}%)</p>
          {signPerYesterday > 0 ? (
            <p>▼</p>
          ) : signPerYesterday < 0 ? (
            <p>▲</p>
          ) : (
            <p>-</p>
          )}
        </StyledContentsMiniTitle>
      </StyledContentsTitleGroup>
      {showTooltip && company.description && createPortal(
        <StyledTooltip
          style={{ top: `${tooltipPos.top}px`, left: `${tooltipPos.left}px` }}
          darkMode={darkMode}
        >
          <StyledTooltipTitle>
            <AiOutlineInfoCircle />
            AI 피셜
          </StyledTooltipTitle>
          {company.description}
        </StyledTooltip>,
        document.body
      )}
    </StyledContentsDiv>
  );
}
