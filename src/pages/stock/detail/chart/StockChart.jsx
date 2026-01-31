import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import { useSelector } from 'react-redux';
import {StyledInput, FlexContainer, Label, CustomTabs} from './StockChart.style';
const getTodayDate = () => {
  const today = new Date();
  const offsetDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().split('T')[0];
};


const getMonthsAgo = (months) => {
  const today = new Date(getTodayDate());
  today.setMonth(today.getMonth() - months);
  const offsetDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().split('T')[0];
};

export const StockChart = ({symbol}) => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const startDateBusinessDaysAgo = getMonthsAgo(5);
  const [startDate, setStartDate] = useState(startDateBusinessDaysAgo);
  const [endDate, setEndDate] = useState(getTodayDate());
  const [activeTab, setActiveTab] = useState('D'); // Default to 'day' tab
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchChartData(formatDate(startDate), formatDate(endDate), activeTab); // Fetch initial chart data based on active tab
  },[activeTab, endDate, startDate]);

  const fetchChartData = async (startDate, endDate, period) => {
    let apiUrl = `/api/period-price?symbol=${symbol}&startDate=${startDate}&endDate=${endDate}&period=${period}`;

    try {
      const response = await axios.get(apiUrl);
     setChartData(response.data); 
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const transformDataForChart = (data) => {
    return data.map(item => {
      // item.stck_bsop_date가 undefined가 아닌지 확인
      if (!item.stck_bsop_date) {
        console.error('stck_bsop_date is undefined for item:', item);
        return null; // null을 반환하여 이 항목을 무시하도록 설정
      }
      return {
        x: Date.UTC(
          parseInt(item.stck_bsop_date.slice(0, 4)),
          parseInt(item.stck_bsop_date.slice(4, 6)) - 1,
          parseInt(item.stck_bsop_date.slice(6, 8))
        ),
        y: [parseFloat(item.stck_oprc), parseFloat(item.stck_hgpr), parseFloat(item.stck_lwpr), parseFloat(item.stck_clpr)]
      };
    }).filter(item => item !== null); // null인 항목을 제거
  };

  const options = {
    chart: {
      type: 'candlestick',
      height: "600px",
      background: darkMode ? '#333333' : 'white',
    },
    plotOptions: {
        candlestick: {
          colors: {
            upward: '#ED3738', // 증가할 때의 색상
            downward: '#077DF3', // 감소할 때의 색상
          },
          
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: darkMode ? '#fff' : '#000', // x-axis labels color based on dark mode
          }
      },
      axisBorder: {
        color: darkMode ? '#ddd' : '#333', 
      },
      axisTicks: {
        color: darkMode ? '#ddd' : '#333', 
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: darkMode ? '#fff' : '#000', 
        }
      },
    },
    theme: {
      mode: darkMode ? 'dark' : 'light' 
    }
  };

  const series = [
    {
      data: transformDataForChart(chartData),
    },
  ];

  
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);
  const handleTabChange = (eventKey) => {
    setActiveTab(eventKey);
  };
  const formatDate = (dateString) => {
    const dateParts = dateString.split('-');
    return dateParts.join('');
  };

  return (
    <div id="chart">
     
     <FlexContainer>
      <span >
        <Label darkMode={darkMode}>시작 날짜:</Label>
        <StyledInput 
          type="date" 
          value={startDate} 
          onChange={handleStartDateChange} 
          max={endDate}
          darkMode={darkMode}
         

        />
        </span>
        <span>
        <Label darkMode={darkMode}>종료 날짜:</Label>
        <StyledInput 
          type="date" 
          value={endDate} 
          onChange={handleEndDateChange}
          min={startDate}
          max={getTodayDate()}
          darkMode={darkMode}
        />
        
        </span>
      
      
      </FlexContainer>
      <div style={{fontSize:"14px", display:"flex", justifyContent:"end", marginBottom:"35px",color:darkMode? "white":"black"}}><i class="bi bi-info-circle" style={{marginRight:"5px"}}></i>일별 / 주별 / 월별 / 연별로 현재 날짜로부터 최대 100개의 정보를 제공합니다.</div>

      <CustomTabs justify variant='tabs' activeKey={activeTab} onSelect={handleTabChange} darkMode={darkMode}>
        <Nav.Item>
          <Nav.Link  eventKey="D">일별</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  eventKey="W">주별</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="M">월별</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Y">연별</Nav.Link>
        </Nav.Item>
      </CustomTabs>
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={400}
        
      />
    </div>
  );
};

export default StockChart;
