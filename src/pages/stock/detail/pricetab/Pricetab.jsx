import React, { useEffect, useState } from 'react';
import { StyledTable, StyledChangeRate, StyledPriceChange, LoaderWrapper } from './Pricetab.style';
import apiClient from "~/utils/axios";
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
export default function Pricetab({id}) {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const [dailyPrice, setDailyPrice] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await apiClient.get(`/api/daily-price?symbol=${id}&period=D`); 
            setDailyPrice(response.data.output);
        };
        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        return `${month}.${day}`;
    };

    const formatPC = (dataString) => {
        const sign = dataString.substring(0, 1);
        const number = dataString.substring(1);
        if (sign === '-') {
            return <StyledPriceChange color="#077DF3"><i className="bi bi-caret-down-fill"></i> {numberWithCommas(number)}</StyledPriceChange>;
        } else if (sign === '0') {
            return <span style={{ color: 'gray' }}>{numberWithCommas(dataString)}</span>;
        } else {
            return <StyledPriceChange color="#ED3738"><i className="bi bi-caret-up-fill"></i> {numberWithCommas(dataString)}</StyledPriceChange>;
        }
    };

    const formatCR = (dataString) => {
        const sign = dataString.substring(0, 1);
        const zero=dataString.substring(0,4);
        const number = dataString.substring(1);
        if (sign === '-') {
            return <StyledChangeRate color="#077DF3">-{numberWithCommas(number)}%</StyledChangeRate>;
        } else if (zero === '0.00') {
            return <StyledChangeRate color="gray">{numberWithCommas(dataString)}%</StyledChangeRate>;
        } else {
            return <StyledChangeRate color="#ED3738">+{numberWithCommas(dataString)}%</StyledChangeRate>;
        }
    };
    const numberWithCommas = (number) => {
        if (!number) return ''; // 값이 없으면 빈 문자열 반환
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    return (
        <div>
            {dailyPrice ? (
                <StyledTable darkMode={darkMode}>
                    <thead>
                        <tr>
                            <th>날짜</th>
                            <th>종가</th>
                            <th>전일 대비</th>
                            <th>등락률</th>
                            <th>시가</th>
                            <th>고가</th>
                            <th>저가</th>
                            <th>거래량</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dailyPrice.map((price, index) => (
                            <tr key={index}>
                                <td>{formatDate(price.stck_bsop_date)}</td>
                                <td>{numberWithCommas(price.stck_clpr)}</td>
                                <td>{formatPC(price.prdy_vrss)}</td>
                                <td>{formatCR(price.prdy_ctrt)}</td>
                                <td>{numberWithCommas(price.stck_oprc)}</td>
                                <td>{numberWithCommas(price.stck_hgpr)}</td>
                                <td>{numberWithCommas(price.stck_lwpr)}</td>
                                <td>{numberWithCommas(price.acml_vol)}</td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            ) : (
                <LoaderWrapper>
                    <ClipLoader />
                </LoaderWrapper>
            )}
        </div>
    );
}
