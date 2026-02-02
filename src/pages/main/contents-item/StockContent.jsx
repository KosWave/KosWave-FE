import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  StyledContentsDiv,
  StyledContentsTitleGroup,
  StyledContentsTitle,
  StyledContentsMiniTitle,
} from "./Contents.style";
import apiClient from "~/utils/axios";
import { useSelector } from "react-redux";

export default function StockContent(props) {
  const navigate = useNavigate();
  const company = props.company;
  const companyCode = company.code;
  const companyName = company.name;
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [ratePerYesterday, setRatePerYesterday] = useState(0);
  /*
  	-2 : 상한
    -1 : 상승
    0 : 보합
    1 : 하한
    2 : 하락
  */
  const [signPerYesterday, setsignPerYesterday] = useState(0);
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

  const handleDivClick = () => {
    navigate(`/main/stocks/detail/?code=${companyCode}&name=${companyName}`);
  };
  return (
    // !! div에 key값 붙여주세요. (redux 구현 후)
    <StyledContentsDiv
      width={props.width}
      height={props.height}
      onClick={handleDivClick}
      darkMode={darkMode}
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
    </StyledContentsDiv>
  );
}
