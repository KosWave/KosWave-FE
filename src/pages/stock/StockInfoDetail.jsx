import React from "react";
import {
  StyledInfoDetailDiv,
  StyledTitleStockDetail,
  StyledStockDetailDiv,
  StyledStockDetailTime,
  StyledMoveDetailDiv,
  StyledMoveIcon,
} from "./StockInfoDetail.style";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import darkmode from "../../store/reducers/darkmode";

let curDate = new Date();
curDate.setDate(curDate.getDate() - 1);
let day = String(curDate.getDate()).padStart(2, "0");
let month = String(curDate.getMonth() + 1).padStart(2, "0");
let year = String(curDate.getFullYear()).slice(2);
let formattedDate = `${year}.${month}.${day}`;
console.log("formattedDate : " + formattedDate);

const getInvestorTradeColor = (value, darkMode) => {
  if (value.includes("%")) {
    return darkMode ? "darkgray" : "black";
  }

  const numValue = parseFloat(value.replace(/[^0-9.-]/g, ""));

  if (isNaN(numValue)) {
    return "black";
  }

  if (numValue < 0) {
    return "#1F69E5";
  } else if (numValue > 0) {
    return "tomato";
  }

  return "black";
};

const SeiseInfo = ({ details, darkMode }) => (
  <StyledInfoDetailDiv darkMode={darkMode}>
    <StyledTitleStockDetail darkMode={darkMode}>
      시세정보
    </StyledTitleStockDetail>
    <div>
      <p>시가</p>
      <p style={{ color: "tomato", fontWeight: "bold" }}>
        {details.openingPrice}
      </p>
    </div>
    <div>
      <p>1년 최고</p> <p>{details.oneYearHigh}</p>
    </div>
    <div>
      <p>1년 최저</p> <p>{details.oneYearLow}</p>
    </div>
  </StyledInfoDetailDiv>
);

const StockInfo = ({ details, darkMode }) => (
  <StyledInfoDetailDiv darkMode={darkMode}>
    <StyledTitleStockDetail darkMode={darkMode}>
      종목정보
    </StyledTitleStockDetail>
    <div>
      <p>시총</p> <p>{details.marketcome}</p>
    </div>
    <div>
      <p>거래량</p> <p>{details.tradingVolume}</p>
    </div>
  </StyledInfoDetailDiv>
);

const InvestorTrade = ({ details, darkMode }) => (
  <StyledInfoDetailDiv darkMode={darkMode}>
    <StyledTitleStockDetail darkMode={darkMode}>
      투자자별 매매동향
      <StyledStockDetailTime
        darkMode={darkMode}
      >{`${formattedDate}`}</StyledStockDetailTime>
    </StyledTitleStockDetail>
    <div>
      <p>외국인보유율</p>
      <p
        style={{
          color: getInvestorTradeColor(details.foreignOwnershipRate, darkMode),
          fontWeight: "bold",
        }}
      >
        {details.foreignOwnershipRate}
      </p>
    </div>
    <div>
      <p>외국인매매</p>
      <p
        style={{
          color: getInvestorTradeColor(details.foreignTrade),
          fontWeight: "bold",
        }}
      >
        {details.foreignTrade}
      </p>
    </div>
    <div>
      <p>기관매매</p>
      <p
        style={{
          color: getInvestorTradeColor(details.institutionalTrade),
          fontWeight: "bold",
        }}
      >
        {details.institutionalTrade}
      </p>
    </div>
  </StyledInfoDetailDiv>
);

const QuarterResult = ({ details, section, darkMode }) => (
  <StyledInfoDetailDiv darkMode={darkMode}>
    <StyledTitleStockDetail darkMode={darkMode}>
      분기실적{" "}
      <StyledStockDetailTime darkMode={darkMode}>
        {section.slice(4)}
      </StyledStockDetailTime>
    </StyledTitleStockDetail>
    <div>
      <p>매출액: </p>
      <p> {details.revenue}</p>
    </div>

    <div>
      <p>영업이익: </p>
      <p> {details.operatingIncome}</p>
    </div>
    <div>
      <p>당기순이익: </p>
      <p>{details.netIncome}</p>
    </div>
  </StyledInfoDetailDiv>
);

const StockDataComponent = ({ data, darkMode }) => {
  switch (data.section.slice(0, 4)) {
    case "시세정보":
      return <SeiseInfo details={data.details} darkMode={darkMode} />;
    case "종목정보":
      return <StockInfo details={data.details} darkMode={darkMode} />;
    case `투자자별`:
      return <InvestorTrade details={data.details} darkMode={darkMode} />;
    case "분기실적":
      return (
        <QuarterResult
          details={data.details}
          section={data.section}
          darkMode={darkMode}
        />
      );
    default:
      return <div>알 수 없는 데이터</div>;
  }
};

const StockInfoDetail = (props) => {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleNavigation = () => {
    const params = new URLSearchParams({
      code: props.curCompanyCode,
      name: props.curCompanyName,
    });

    navigate(`/main/stocks/detail?${params.toString()}`);
  };

  return (
    <>
      <StyledStockDetailDiv darkMode={darkMode}>
        {props.info?.map((data, index) => (
          <StockDataComponent key={index} data={data} darkMode={darkMode} />
        ))}
      </StyledStockDetailDiv>
      <StyledMoveDetailDiv onClick={handleNavigation} darkMode={darkMode}>
        <span>
          상세정보 더보기{" "}
          <span>
            <StyledMoveIcon />
          </span>
        </span>
      </StyledMoveDetailDiv>
    </>
  );
};

export default StockInfoDetail;
