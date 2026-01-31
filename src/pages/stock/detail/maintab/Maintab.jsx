import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledMainTabDiv, Table, Th, Td, Thead, Tbody } from './Maintab.style';
import { useSelector } from 'react-redux';
export default function Maintab({id}) {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const [currentPrice, setCurrentPrice] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/current-price?symbol=${id}`);
                setCurrentPrice(response.data.output);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const numberWithCommas = (number) => {
        if (!number) return ''; // 값이 없으면 빈 문자열 반환
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    return (
        <StyledMainTabDiv>
            {currentPrice && (
                <Table>
                    <Thead>
                        <tr>
                            <Th darkMode={darkMode}>전일</Th>
                            <Th darkMode={darkMode}>시가</Th>
                            <Th darkMode={darkMode}>고가</Th>
                            <Th darkMode={darkMode}>저가</Th>
                        </tr>
                    </Thead>
                    <Tbody>
                        <tr>
                            <Td darkMode={darkMode}>{numberWithCommas(currentPrice.stck_prpr)}</Td>
                            <Td darkMode={darkMode}>{numberWithCommas(currentPrice.stck_oprc)}</Td>
                            <Td darkMode={darkMode}>{numberWithCommas(currentPrice.stck_hgpr)}</Td>
                            <Td darkMode={darkMode}>{numberWithCommas(currentPrice.stck_lwpr)}</Td>
                        </tr>
                    </Tbody>
                    <Thead>
                        <tr>
                            <Th darkMode={darkMode}>거래량</Th>
                            <Th darkMode={darkMode}>대금</Th>
                            <Th darkMode={darkMode}> 시총</Th>
                            <Th darkMode={darkMode}>외인소진율</Th>
                        </tr>
                    </Thead>
                    <Tbody>
                        <tr>
                            <Td darkMode={darkMode}>{numberWithCommas((currentPrice.acml_vol / 1000000).toFixed(2))} 백만</Td>
                            <Td darkMode={darkMode}>{numberWithCommas((currentPrice.acml_tr_pbmn / 100000000).toFixed(2))} 억</Td>
                            <Td darkMode={darkMode}>{numberWithCommas((currentPrice.lstn_stcn * currentPrice.stck_prpr / 100000000).toFixed(2))} 억</Td>
                            <Td darkMode={darkMode}>{numberWithCommas(currentPrice.hts_frgn_ehrt)}%</Td>
                        </tr>
                    </Tbody>
                    <Thead>
                        <tr>
                            <Th darkMode={darkMode}>52주 최고</Th>
                            <Th darkMode={darkMode}>52주 최저</Th>
                            <Th darkMode={darkMode}>PER</Th>
                            <Th darkMode={darkMode}>EPS</Th>
                        </tr>
                    </Thead>
                    <Tbody>
                        <tr>
                            <Td darkMode={darkMode}>{numberWithCommas(currentPrice.w52_hgpr)}</Td>
                            <Td darkMode={darkMode}>{numberWithCommas(currentPrice.w52_lwpr)}</Td>
                            <Td darkMode={darkMode}>{numberWithCommas(currentPrice.per)}배</Td>
                            <Td darkMode={darkMode}>{numberWithCommas(currentPrice.eps)}원</Td>
                        </tr>
                    </Tbody>
                    <Thead>
                        <tr>
                            <Th darkMode={darkMode}>PBR</Th>
                            <Th darkMode={darkMode}>BPS</Th>
                            <Th darkMode={darkMode}></Th>
                            <Th darkMode={darkMode}></Th>
                        </tr>
                    </Thead>
                    <Tbody>
                        <tr>
                            <Td darkMode={darkMode}>{numberWithCommas(currentPrice.pbr)} 배</Td>
                            <Td darkMode={darkMode}>{numberWithCommas(currentPrice.bps)} 원</Td>
                            <Td darkMode={darkMode}></Td>
                            <Td darkMode={darkMode}></Td>
                        </tr>
                    </Tbody>
                </Table>
            )}
        </StyledMainTabDiv>
    );
}
