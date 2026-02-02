import { useState, useEffect } from "react";
import ContentHeader from "./contents-item/ContentHeader";
import StockContent from "./contents-item/StockContent";
import { Contents, StyledContentsDiv } from "./contents-item/Contents.style";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import apiClient from "~/utils/axios";
import { StyledMainContentDiv } from "./Main.style";
import { useSelector } from "react-redux";

export default function RelatedStock({ keyword }) {
  const MAX_STOCK_SIZE = 6;
  const STOCK_CONTENT_WIDTH = "15%";
  const STOCK_CONTENT_HEIGHT = "90px";

  const [companies, setCompaines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    let ignore = false;
    setCompaines([]);
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/api/company?word=${keyword}`);
        if (ignore) return;

        const dataArray = response.data.message || [];
        // 최대 6개까지만 가져오고, null/undefined 제거
        const limitedCompanies = dataArray
          .slice(0, MAX_STOCK_SIZE)
          .filter(company => company != null);
        setCompaines(limitedCompanies);
      } catch (error) {
        if (!ignore) console.error("Error fetching the news:", error);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      ignore = true;
    };
  }, [keyword]);

  return (
    <StyledMainContentDiv darkMode={darkMode}>
      <ContentHeader
        imgUrl="/assets/images/hand-with-care.svg"
        keyword={keyword}
        description="와(과) 관련도가 높은 주식회사에요."
        toLink="/main/stock"
      ></ContentHeader>
      <Contents darkMode={darkMode}>
        {/* 내용이 들어오면 변경 */}
        {isLoading ? (
          Array.from({ length: MAX_STOCK_SIZE }).map((elem, index) => (
            <StyledContentsDiv
              width={STOCK_CONTENT_WIDTH}
              height={STOCK_CONTENT_HEIGHT}
              darkMode={darkMode}
              key={index}
            >
              <Skeleton
                width={140}
                height={20}
                style={{ margin: "0.5rem" }}
              />
              <Skeleton width={70} height={15} />
            </StyledContentsDiv>
          ))
        ) : companies.length === 0 || companies[0]?.similarity == 0 ? (
          darkMode ? (
            <img
              style={{ width: "952px", height: "227px" }}
              src="/assets/images/no-data-darkmode.svg"
            ></img>
          ) : (
            <img
              style={{ width: "952px", height: "227px" }}
              src="/assets/images/no-data.svg"
            ></img>
          )
        ) : (
          companies.map((company, index) => (
            <StockContent
              key={company?.code || company?.id || index}
              company={company}
              width={STOCK_CONTENT_WIDTH}
              height={STOCK_CONTENT_HEIGHT}
            />
          ))
        )}
      </Contents>
    </StyledMainContentDiv>
  );
}
