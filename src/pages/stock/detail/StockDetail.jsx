import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/common/sidebar/Sidebar";
import Nav from "react-bootstrap/Nav";
import {
  Container,
  Content,
  ChartSection,
  TabsSection,
  CustomTabs,
  StockStatus,
  PriceContent,
  LinkTo,
} from "./StockDetail.style";
import { StyledPriceChange } from "./pricetab/Pricetab.style";
import "bootstrap/dist/css/bootstrap.min.css";
import Maintab from "./maintab/Maintab";
import Pricetab from "./pricetab/Pricetab";
import Newstab from "./newstab/Newstab";
import Header from "../../../components/common/header/Header";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ChartModal from "./chart/ChartModal";
import { ClipLoader } from "react-spinners";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { GlowIcon } from "./StockDetail.style";
export default function StockDetail() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const name = searchParams.get("name");
  const [activeTab, setActiveTab] = useState("main");
  const [stockData, setStockData] = useState(null);
  const [marketStatus, setMarketStatus] = useState(1);
  const [lastPrice, setLastPrice] = useState();
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleShowChart = () => {
    setShow(true);
  };
  const onHide = () => {
    setShow(false);
  };
  const handleBackClick = () => {
    navigate(-1); // This navigates back to the previous page
  };

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  useEffect(() => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const day = currentDate.getDay();
    const isMarketClosed =
      day === 0 ||
      day === 6 ||
      hours < 9 ||
      hours > 15 ||
      (hours === 15 && minutes > 30);
    let ws;
    const fetchDailyData = async () => {
      try {
        const response = await axios.get(
          `/api/daily-price?symbol=${code}&period=D`
        );
        setLastPrice(response.data.output[0]);
        setMarketStatus(0); // Market closed
      } catch (error) {
        console.error("API 요청 에러:", error);
      } finally {
        setLoading(false);
      }
    };
    if (isMarketClosed) {
      fetchDailyData();
    } else {
      ws = new WebSocket("ws://localhost:3002");
      ws.onopen = function () {
        console.log("WebSocket 연결이 열렸습니다.");
        ws.send(JSON.stringify({ id: code }));
      };
      ws.onmessage = function (event) {
        const data = JSON.parse(event.data);
        console.log("받은 데이터!!", data);
        setStockData(data);
        setMarketStatus(1);
        setLoading(false);
      };

      ws.onclose = function (event) {
        console.log("WebSocket 연결이 닫혔습니다.");
      };
    }

    return () => {
      if (ws) {
        ws.close();
        console.log("WebSocket 연결이 종료되었습니다.");
      }
    };
  }, [code]);

  const handleTabSelect = (eventKey) => {
    setActiveTab(eventKey);
  };

  const renderPriceChange = () => {
    if (loading) {
      return <ClipLoader />;
    }
    if (!stockData) return null;
    return (
      <PriceContent darkMode={darkMode}>
        <div style={{ fontSize: "35px", fontWeight: "bold" }}>
          {parseInt(stockData.주식현재가).toLocaleString()}
          <span style={{ fontSize: "15px", marginLeft: "3px" }}>원</span>
        </div>
        <div style={{ display: "flex", gap: "7px" }}>
          {formatPC(stockData.전일대비)}
          {formatCR(stockData.전일대비율)}
        </div>
        <StockStatus>
          <>
            {formattedTime}
            <i
              class="bi bi-circle-fill"
              style={{
                color: "#4BFF3B",
                fontSize: "8px",
                marginLeft: "15px",
                marginRight: "5px",
              }}
            ></i>
            실시간
          </>
        </StockStatus>
      </PriceContent>
    );
  };

  const formatPC = (dataString) => {
    const sign = dataString.substring(0, 1);
    const number = dataString.substring(1);
    if (sign === "-") {
      return (
        <StyledPriceChange color="#077DF3">
          <i className="bi bi-caret-down-fill"></i> {numberWithCommas(number)}
        </StyledPriceChange>
      );
    } else if (sign === "0") {
      return (
        <span style={{ color: "gray", fontWeight: "600" }}>
          {numberWithCommas(dataString)}
        </span>
      );
    } else {
      return (
        <StyledPriceChange color="#ED3738">
          <i className="bi bi-caret-up-fill"></i> {numberWithCommas(dataString)}
        </StyledPriceChange>
      );
    }
  };

  const formatCR = (dataString) => {
    const sign = dataString.substring(0, 1);
    const zero = dataString.substring(0, 4);
    const number = dataString.substring(1);
    if (sign === "-") {
      return (
        <span style={{ color: "#077DF3", fontWeight: "bold" }}>
          -{numberWithCommas(number)}%
        </span>
      );
    } else if (zero === "0.00") {
      return (
        <span style={{ color: "gray", fontWeight: "bold" }}>
          {numberWithCommas(dataString)}%
        </span>
      );
    } else {
      return (
        <span style={{ color: "#ED3738", fontWeight: "bold" }}>
          +{numberWithCommas(dataString)}%
        </span>
      );
    }
  };
  const numberWithCommas = (number) => {
    if (!number) return ""; // 값이 없으면 빈 문자열 반환
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleLinkTo = () => {
    window.location.href = "https://digitalshinhansec.com/stock";
  };
  const DateStatus = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const dayPeriod = hours < 9 ? "개장전" : "장마감";
    const displayDate = currentDate.toLocaleDateString("ko-KR", {
      month: "numeric",
      day: "numeric",
    });

    return (
      <div>
        <span>{displayDate}</span>
        <i
          className="bi bi-circle-fill"
          style={{ color: "#9A9D9E", fontSize: "8px", marginLeft: "15px" }}
        ></i>
        <span style={{ marginLeft: "5px" }}>{dayPeriod}</span>
      </div>
    );
  };

  const handleClick = () => {
    window.open(
      `http://ec2-3-35-199-226.ap-northeast-2.compute.amazonaws.com/${code}`,
      "_blank"
    );
  };

  return (
    <Container>
      <Sidebar />
      <Content darkMode={darkMode}>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>
          <GlowIcon onClick={handleBackClick} darkMode={darkMode}>
            <HiChevronDoubleLeft />
            <span>뒤로가기</span>
          </GlowIcon>
          <LinkTo onClick={handleLinkTo} darkMode={darkMode}>
            {" "}
            <i
              class="bi bi-box-arrow-up-right"
              style={{ marginRight: "3px", fontSize: "26px" }}
            ></i>
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>
              <i style={{ fontSize: "23px" }}>{name}</i> 투자하러 가기
            </span>
          </LinkTo>
        </div>
        <ChartSection>
          <div className="header-content">
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: darkMode ? "white" : "black",
              }}
            >
              {code}
            </div>

            <h4 style={{ color: darkMode ? "white" : "black" }}>{name}</h4>
            <div>
              {marketStatus === 1 && renderPriceChange()}
              {marketStatus === 0 && lastPrice && (
                <PriceContent darkMode={darkMode}>
                  <div style={{ fontSize: "35px", fontWeight: "bold" }}>
                    {numberWithCommas(lastPrice.stck_clpr)}
                    <span style={{ fontSize: "15px", marginLeft: "3px" }}>
                      원
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "7px" }}>
                    {formatPC(lastPrice.prdy_vrss)}
                    {formatCR(lastPrice.prdy_ctrt)}
                  </div>
                  <StockStatus>
                    <DateStatus />
                  </StockStatus>
                </PriceContent>
              )}
            </div>
          </div>
          <div className="chart-image">
            <img
              src="/assets/images/chart.png"
              alt="chart"
              onClick={handleShowChart}
              style={{
                width: "150px",
                marginBottom: "10pxs",
                cursor: "pointer",
              }}
            />
            <div>
              <i
                class="bi bi-arrows-fullscreen"
                style={{
                  color: "#0DAA5C",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={handleShowChart}
              ></i>
              <span
                style={{
                  fontSize: "12px",
                  marginLeft: "10px",
                  color: "#0DAA5C",
                  cursor: "pointer",
                }}
                onClick={handleShowChart}
              >
                차트 자세히 보기
              </span>
            </div>

            <ChartModal show={show} onHide={onHide} code={code} name={name} />
          </div>
        </ChartSection>
        <TabsSection>
          <CustomTabs
            justify
            variant="underline"
            activeKey={activeTab}
            onSelect={handleTabSelect}
            darkMode={darkMode}
          >
            <Nav.Item>
              <Nav.Link eventKey="main">종합</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="news">뉴스</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="price">시세</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="" onClick={handleClick}>
                재무
              </Nav.Link>
            </Nav.Item>
          </CustomTabs>
          <div style={{ height: "calc(100vh - 452px)", overflowY: "auto" }}>
            {activeTab === "main" && <Maintab id={code} />}
            {activeTab === "news" && <Newstab id={code} />}
            {activeTab === "price" && <Pricetab id={code} />}
          </div>
        </TabsSection>
      </Content>
    </Container>
  );
}
