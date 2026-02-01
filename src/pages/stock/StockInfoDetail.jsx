import { useEffect } from "react";
import {
  StyledToggleCircle,
  StyledToggleContainer,
} from "./StockInfoDetail.style";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";import { toggleStockMode } from "../../store/reducers/stockmode";

// 1. 날짜 포맷 로직 (컴포넌트 외부 유지 가능)
let curDate = new Date();
curDate.setDate(curDate.getDate() - 1);
let day = String(curDate.getDate()).padStart(2, "0");
let month = String(curDate.getMonth() + 1).padStart(2, "0");
let year = String(curDate.getFullYear()).slice(2);
let formattedDate = `${year}.${month}.${day}`;


// --- 메인 컴포넌트 ---
const StockInfoDetail = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Hook은 반드시 컴포넌트 내부 최상단에 위치해야 합니다.
  const darkMode = useSelector((state) => state.theme.darkMode);
  const stockMode = useSelector((state) => state.stock.stockMode);
  console.log(stockMode)

  useEffect(() => {
    localStorage.setItem("stockmode", stockMode);
  }, [stockMode]);

  const onClickStockMode = () => {
    dispatch(toggleStockMode());
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
        <span style={{ color: darkMode ? "white" : "black" }}>트렌드</span>
        <StyledToggleContainer
          isDarkMode={darkMode}
          isStockMode={stockMode}
          onClick={onClickStockMode}
        >
          <StyledToggleCircle 
            isDarkMode={darkMode} 
            isStockMode={stockMode} 
          />
        </StyledToggleContainer>
        <span style={{ color: darkMode ? "white" : "black" }}>주가</span>
      </div>
    </>
  );
};

export default StockInfoDetail;