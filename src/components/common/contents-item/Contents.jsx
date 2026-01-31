import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import {
  StyledContentsDiv,
  StyledContentsTitle,
  StyledContentsTitleGroup,
  StyledContentsSubTitle,
  StyledContentsMiniTitle,
  StyledContentsTag,
} from "./Contents.style";
import { formatCurrency } from "../../../lib/utils/utils";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

const fetchDailyPrice = async (symbol) => {
  const result = await axios.get("/api/daily-price", {
    params: {
      symbol: symbol,
      period: "D",
    },
  });
  return result.data;
};

export default function Contents(props) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { data, isLoading, error } = useQuery(
    ["dailyPrice", props.item.code],
    () => fetchDailyPrice(props.item.code),
    {
      refetchInterval: 60000,
    }
  );

  const [highlightColor, setHighlightColor] = useState("");
  const previousPriceRef = useRef(null);

  useEffect(() => {
    if (!isLoading && data) {
      const currentData = data.output[0];
      const currentPrice =
        Number(currentData.stck_oprc) + Number(currentData.prdy_vrss);

      if (previousPriceRef.current !== null) {
        if (currentPrice > previousPriceRef.current) {
          setHighlightColor("#E24B38");
        } else if (currentPrice < previousPriceRef.current) {
          setHighlightColor("#4383F2");
        }
      }

      previousPriceRef.current = currentPrice;

      const timer = setTimeout(() => {
        setHighlightColor("");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return (
      <StyledContentsDiv width={"230px"} height={"150px"}>
        <Skeleton height={20} />
        <Skeleton height={15} />
        <Skeleton height={15} width="80%" />
      </StyledContentsDiv>
    );
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  const allData = data;
  const currentData = data.output[0];
  const isPriceIncrease = currentData.prdy_vrss_sign === "2";
  const priceChangeIcon = isPriceIncrease ? (
    <img src="/assets/images/up-icon.png" alt="Increase" />
  ) : (
    <img src="/assets/images/down-icon.png" alt="Decrease" />
  );

  const onClickItem = (e) => {
    if (!isLoading) {
      props.currentCompany(allData, props.item.name, props.id, props.item.code);
    }
  };

  return (
    <StyledContentsDiv
      width={props.width}
      height={props.height}
      isCheck={props.curCompanyId === props.id}
      onClick={onClickItem}
      darkMode={darkMode}
    >
      <StyledContentsTitleGroup>
        <div>
          <StyledContentsTitle>{props.item.name}</StyledContentsTitle>
          <StyledContentsSubTitle
            isPriceIncrease={isPriceIncrease}
            style={{
              color: highlightColor,
            }}
          >
            {formatCurrency(
              Number(currentData.stck_oprc) + Number(currentData.prdy_vrss)
            )}{" "}
            krw
          </StyledContentsSubTitle>
        </div>
        <StyledContentsMiniTitle isPriceIncrease={isPriceIncrease}>
          <span>
            {isPriceIncrease ? "+" : ""}
            {formatCurrency(currentData.prdy_vrss)}원
          </span>
          <span>({currentData.prdy_ctrt}%) 오늘</span>
          {priceChangeIcon}
        </StyledContentsMiniTitle>
      </StyledContentsTitleGroup>
      <StyledContentsTag darkMode={darkMode}>
        <div>
          시가{" "}
          <span style={{ marginLeft: "5px" }}>{currentData.stck_oprc}</span>
        </div>
      </StyledContentsTag>
    </StyledContentsDiv>
  );
}
