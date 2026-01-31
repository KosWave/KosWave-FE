import React from "react";
import { StyledInfoDetailDiv } from "./StockInfoDetail.style";
const SeiseInfo = ({ details }) => (
  <StyledInfoDetailDiv>
    <h3>시세정보</h3>
    <div>
      <p>시가</p>
      <p>{details.openingPrice}</p>
    </div>
    <div>
      <p>1년 최고</p> <p>{details.oneYearHigh}</p>
    </div>
    <div>
      <p>1년 최저</p> <p>{details.oneYearLow}</p>
    </div>
  </StyledInfoDetailDiv>
);

const StockInfo = ({ details }) => (
  <StyledInfoDetailDiv>
    <h3>종목정보</h3>
    <div>
      <p>시총</p> <p>{details.marketcome}</p>
    </div>
    <div>
      <p>거래량</p> <p>{details.tradingVolume}</p>
    </div>
  </StyledInfoDetailDiv>
);

const InvestorTrade = ({ details }) => (
  <StyledInfoDetailDiv>
    <h3>투자자별 매매동향 24.06.19</h3>
    <div>
      <p>외국인보유율</p> <p>{details.foreignOwnershipRate}</p>
    </div>
    <div>
      <p>외국인매매율</p>
      <p> {details.foreignTrade}</p>
    </div>
    <div>
      <p>기관매매율</p>
      <p>{details.institutionalTrade}</p>
    </div>
  </StyledInfoDetailDiv>
);

const QuarterResult = ({ details }) => (
  <StyledInfoDetailDiv>
    <h3>분기실적 2024.03.</h3>
    <p>매출액: {details.revenue}</p>
    <p>영업이익: {details.operatingIncome}</p>
    <p>당기순이익: {details.netIncome}</p>
  </StyledInfoDetailDiv>
);

const StockDataComponent = ({ data }) => {
  switch (data.section) {
    case "시세정보":
      return <SeiseInfo details={data.details} />;
    case "종목정보":
      return <StockInfo details={data.details} />;
    case "투자자별 매매동향 24.06.19":
      return <InvestorTrade details={data.details} />;
    case "분기실적 2024.03.":
      return <QuarterResult details={data.details} />;
    default:
      return <div>알 수 없는 데이터</div>;
  }
};

// Sample data based on your structure
const stockData = [
  {
    section: "시세정보",
    details: {
      openingPrice: "678,000",
      oneYearHigh: "718,000",
      oneYearLow: "103,100",
    },
  },
  {
    section: "종목정보",
    details: { marketcome: "4조 8,211억", tradingVolume: "193,195" },
  },
  {
    section: "투자자별 매매동향 24.06.19",
    details: {
      foreignOwnershipRate: "12.90%",
      foreignTrade: "-51,338",
      institutionalTrade: "-12,688",
    },
  },
  {
    section: "분기실적 2024.03.",
    details: {
      revenue: "3,857억",
      operatingIncome: "801억",
      netIncome: "665억",
    },
  },
];

const StockInfoDetail = () => (
  <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
    {stockData.map((data, index) => (
      <StockDataComponent key={index} data={data} />
    ))}
  </div>
);

export default StockInfoDetail;
