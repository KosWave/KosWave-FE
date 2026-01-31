import {
  StyledStockDiv,
  StyledStockBodyDiv,
  StyledBodyCompanyDiv,
  StyledStockHeaderDiv,
  StyledLoadingDiv,
  StyledContentsDiv,
  StyledHeaderChart,
  StyledSearchSpan,
  StyledPriceSpan,
  BlurDiv,
  StyledStockRightDiv,
  StyledTitleDiv,
} from "./Stock.style";

import ContentsItem from "~/components/common/contents-item/Contents";
import Header from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";
import StockChart from "./Stock.chart";
import { useQuery } from "react-query";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";

const fetchStockData = async (keywords, startDate, endDate, periodOffset) => {
  const response = await axios.post("/api/trends/naver", {
    keywords,
    startDate,
    endDate,
    periodOffset,
  });
  console.log("naver : " + [keywords, startDate, endDate, periodOffset]);
  return response.data;
};

const fetchCompanyData = async (keyword) => {
  const response = await axios.get("/api/company", {
    params: {
      word: keyword,
    },
  });
  return response.data.message.slice(0, 20);
};

export default function StockPage() {
  const keyword = useSelector((state) => state.keyword.keyword);
  const [curCompanyPrice, setCurCompanyPrice] = useState([]);
  const [curCompanyName, setCurCompanyName] = useState("");
  const [curCompanyCode, setCurCompanyCode] = useState("");
  const [curCompanyId, setCurCompanyId] = useState(0);
  const [stockDetails, setStockDetails] = useState([]);
  const [startDate, setStartDate] = useState(() => {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(
      currentDate.setDate(currentDate.getDate() - 30)
    );
    return sevenDaysAgo.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [periodOffset, setPeriodOffset] = useState(30);
  const [initialLoad, setInitialLoad] = useState(true);
  const keywords = [keyword];
  const darkMode = useSelector((state) => state.theme.darkMode);

  const {
    data: stockData,
    isLoading: isStockLoading,
    error: stockError,
    refetch: refetchStockData,
  } = useQuery(
    ["stockData", keyword],
    () =>
      keyword || initialLoad
        ? fetchStockData(keywords, startDate, endDate, periodOffset)
        : Promise.resolve(null),
    {
      staleTime: Infinity,
      enabled: initialLoad || !!keyword,
      //refetchInterval: 10000,
    }
  );

  const {
    data: companyData,
    isLoading: isCompanyLoading,
    error: companyError,
  } = useQuery(
    ["companyData", keyword],
    () => (keyword ? fetchCompanyData(keyword) : Promise.resolve([])),
    {
      staleTime: Infinity,
      enabled: !!keyword,
      //refetchInterval: 10000,
    }
  );

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      refetchStockData();
    }
  }, [initialLoad, refetchStockData]);

  useEffect(() => {
    const fetchDailyPrice = async () => {
      if (companyData && companyData.length > 0) {
        try {
          const result = await axios.get("/api/daily-price", {
            params: {
              symbol: companyData[0].code,
              period: "D",
            },
          });
          console.log(result);
          setCurCompanyName(companyData[0].name);
          setCurCompanyCode(companyData[0].code);
          setCurCompanyPrice(
            result.data.output.map((e) => e.stck_oprc).reverse()
          );
          setCurCompanyId(0);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchDailyPrice();
  }, [companyData, keyword]);

  useEffect(() => {
    const test = async () => {
      const result = await axios.get("/api/stockInfo", {
        params: {
          word: curCompanyName,
        },
      });
      setStockDetails(result.data);
    };
    test();
  }, [curCompanyName]);

  const handleItemClick = async (data, name, id, code) => {
    setCurCompanyId(id);
    setCurCompanyPrice(data.output.map((e) => e.stck_clpr).reverse());
    setCurCompanyName(name);
    setCurCompanyCode(code);
  };

  return (
    <StyledStockDiv>
      <Sidebar />
      <StyledStockRightDiv darkMode={darkMode}>
        <Header />
        <StyledStockHeaderDiv darkMode={darkMode}>
          {keyword ? (
            <>
              최근 한달간 <strong>{`"${keyword}"`}</strong>
              <span>연관 주식</span>의 주가 흐름과 <span>대중의 관심 경향</span>
              을 함께 비교해보세요.
            </>
          ) : (
            "키워드를 입력해주세요."
          )}
        </StyledStockHeaderDiv>
        <StyledStockBodyDiv>
          <div>
            <StyledHeaderChart>
              <StyledTitleDiv darkMode={darkMode}>
                {keyword}의{" "}
                <StyledSearchSpan>검색 트랜드 추이</StyledSearchSpan>와{" "}
                {curCompanyName}의<StyledPriceSpan> 시세 </StyledPriceSpan>비교
              </StyledTitleDiv>
            </StyledHeaderChart>

            {isStockLoading ? (
              <StyledLoadingDiv darkMode={darkMode}>
                <ClipLoader color={"#43D2FF"} loading={true} />
              </StyledLoadingDiv>
            ) : stockError ? (
              <>
                <div
                  style={{
                    width: "800px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: darkMode ? "#47484A" : "white",
                    border: "1px solid rgba(0,0,0,0.15)",
                    borderRadius: "20px",
                    marginLeft: "10px",
                  }}
                >
                  {darkMode ? (
                    <img
                      src="/assets/images/no-data-darkmode.svg"
                      width={"70%"}
                      height={"550px"}
                    />
                  ) : (
                    <img
                      src="/assets/images/no-data.svg"
                      width={"70%"}
                      height={"550px"}
                    />
                  )}
                </div>
              </>
            ) : (
              stockData && (
                <StockChart
                  data={stockData[0]?.data}
                  curCompanyPrice={curCompanyPrice}
                  curCompanyName={curCompanyName}
                  curCompanyCode={curCompanyCode}
                  stockDetails={stockDetails}
                />
              )
            )}
          </div>
          <div style={{ height: "100%", position: "relative" }}>
            <StyledHeaderChart>
              <StyledTitleDiv darkMode={darkMode}>
                {keyword}의 <StyledSearchSpan>연관 기업 정보 </StyledSearchSpan>
                확인하기
              </StyledTitleDiv>
            </StyledHeaderChart>
            <div
              style={{ position: "relative", height: "645px", width: "600px" }}
            >
              <StyledBodyCompanyDiv>
                {isCompanyLoading || !companyData ? (
                  Array.from({ length: 20 }).map((_, index) => (
                    <StyledContentsDiv
                      width={"230px"}
                      height={"150px"}
                      key={index}
                      darkMode={darkMode}
                    >
                      <Skeleton height={20} />
                      <Skeleton height={15} />
                      <Skeleton height={15} width="80%" />
                    </StyledContentsDiv>
                  ))
                ) : companyData[0].similarity == 0 ? (
                  darkMode ? (
                    <div
                      style={{
                        backgroundColor: darkMode ? "#424242" : "white",
                        borderRadius: "20px",
                        width: "90%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid rgba(0,0,0,0.1)",
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "227px" }}
                        src="/assets/images/no-data-box-darkmode.svg"
                      ></img>
                    </div>
                  ) : (
                    <div
                      style={{
                        backgroundColor: darkMode ? "#424242" : "white",
                        borderRadius: "20px",
                        width: "90%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid rgba(0,0,0,0.1)",
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "227px" }}
                        src="/assets/images/no-data-box.svg"
                      ></img>
                    </div>
                  )
                ) : (
                  <>
                    {companyData.map((e, i) => (
                      <ContentsItem
                        width={"230px"}
                        height={"150px"}
                        item={e}
                        key={i}
                        id={i}
                        currentCompany={handleItemClick}
                        curCompanyId={curCompanyId}
                      />
                    ))}
                  </>
                )}
              </StyledBodyCompanyDiv>
              <BlurDiv darkMode={darkMode} />
            </div>
          </div>
        </StyledStockBodyDiv>
      </StyledStockRightDiv>
    </StyledStockDiv>
  );
}
