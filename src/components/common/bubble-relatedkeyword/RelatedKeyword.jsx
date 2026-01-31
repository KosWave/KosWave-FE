import { useState,useRef, useEffect } from "react";
import Bubble from "../bubble/KeywordBubble";
import RelatedNews from "./RelatedNews";
import RelatedKeywordChart from "./RelatedKeyword.chart";
import { StyledHeadTitleBox, StyledTitleBox, StyledGraphBox, StyledNaverbox, StyledNewsContainer, StyledNewsTab, StyledRelatedKeywordContainer, StyledBubbleContainer, StyledCircleContainer, StyledCircleItem, StyledMiniCircleItem, StyledKeyCircleItem, StyledInfoIcon} from "./RelatedKeyword.style";
import sns from "~/images/sns_mark.png"
import { relatedKeywordAPI } from "~/apis/RelatedKeyword.js"
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

export default function RelatedKeyword() {
    // 다크모드 적용
    const darkMode = useSelector((state) => state.theme.darkMode);

    // 스크롤 적용
    const scrollRef = useRef(null);
    // 전역 키워드
    const keyword = useSelector((state) => state.keyword.keyword);
    const params1 = {
        keyword: keyword,
    };   
  
  //버블 원형 배치를 위한 코드
  const big_radius = 268; // 반지름
  const sml_radius = 180;
  const angleStep = 360 / 6;

  //버블 사이즈
  const bubble_size = "190px";
  const mini_bubble_size = "100px";
  const key_bubble_size = "180px";

    //Click한 키워드명
     const [currentword,setCurrentword] = useState(null);
        //keyword가 바뀌어서 연관키워드가 재요청되면, 버블에 띄워진 current word도 업데이트시키기
        useEffect(() => {
            setCurrentword(null);
            setClickedBubble(false);
            setCurrentBubble(null);
            setShowNewsTab(false); 
          }, [keyword]);
    //Click시 버블 줄이기
    const [clickedbubble, setClickedBubble] = useState(false);
    //Click시 버블 투명도 찐하게
    const [currentbubble, setCurrentBubble] = useState(null);
    //Click시 나머지 버블 투명도 조절
    const [opacity, setOpacity] = useState("0.4");
    //Click시 그래프&뉴스탭 보이기
    const [shownewstab, setShowNewsTab] = useState(false);
    //Click하면 수행되는 함수
    const handleClick = (e) => {
        setClickedBubble(true);
        setShowNewsTab(true); 
        setOpacity("0.3");        

        if (currentbubble !== e.target.id) {
            setCurrentBubble(e.target.id);
            setCurrentword(e.target.innerText);

        } else {
            setCurrentBubble(null);
        }
    }

    const handleMiniClick = (e) => {
        setClickedBubble(true);
        setShowNewsTab(true); 
        setOpacity("0.3");
        if (currentbubble !== e.target.id) {
            setCurrentBubble(e.target.id);
            setCurrentword(e.target.innerText);
        } else {
            setCurrentBubble(null);
        }
        
    }

    const params2 = {        
        keyword: params1.keyword,
        exWord: currentword,
    };

    const { data: relatedKeywordData, isLoading: isLoadingKeyword, error: errorKeyword } = useQuery(
    ["relatedkeywordData",keyword],
    () => relatedKeywordAPI(params1),
    {
        staleTime: Infinity,            
    }        
    );


    if (isLoadingKeyword) {
        return (
            <StyledRelatedKeywordContainer darkMode={darkMode}>  
        <StyledHeadTitleBox darkMode={darkMode} className="related-text-box" animate={clickedbubble}>
                            <img src={sns} width={"50px"} height={"auto"}></img>                                 
                                <span>{keyword}과 같이 언급되는 단어들이에요. </span>
            </StyledHeadTitleBox >  
            <Loading></Loading>
            </StyledRelatedKeywordContainer>
        )
    }

    if (errorKeyword) {
        return <div>Error loading related keywords: {errorKeyword.message}</div>;
    }
    
    else return(
        <StyledRelatedKeywordContainer darkMode={darkMode}>  
        <StyledHeadTitleBox className="related-text-box" animate={clickedbubble}>
                            <img src={sns} width={"50px"} height={"auto"}></img>                                 
                                <span>{keyword}과 같이 언급되는 단어들이에요. </span>
        </StyledHeadTitleBox>                      
        <StyledBubbleContainer>
        
            <StyledCircleContainer id="circle-container"  move={clickedbubble}>
                <StyledKeyCircleItem >
                    <Bubble content={keyword} width={key_bubble_size} height={key_bubble_size} fontsize={"1.5rem"} nothover={true}></Bubble>
                </StyledKeyCircleItem>
                
            {relatedKeywordData.data.slice(0,6).map((item, index) => {
                const angle = index * angleStep;
                const radian = (angle * Math.PI) / 180;
                const x = big_radius * Math.cos(radian);
                const y = big_radius * Math.sin(radian);
                
                return (
                <StyledCircleItem key={index} move={clickedbubble}
                x={x} y={y} distance={bubble_size} time={"1.3s"} delay={`${index * 0.5}s`}>
                    <Bubble id={`big-bubble-${index}`} clickfunc={(e) => handleClick(e)}
                    iscurrent={currentbubble===`big-bubble-${index}`}
                    opacity={opacity} content={item.label} width={bubble_size} height={bubble_size} fontsize={"1.5rem"}></Bubble>
                </StyledCircleItem>
                );


            })}
            {relatedKeywordData.data.slice(6,12).map((item, index) => {
                const angle = index * angleStep;
                const radian = (angle * Math.PI) / 180;
                const x = sml_radius * Math.cos(radian+Math.PI/6);
                const y = sml_radius * Math.sin(radian+Math.PI/6);
                
                return (                        
                <StyledMiniCircleItem key={index}
                    x={x} y={y} distance={mini_bubble_size} time={"1s"} delay={`${index * 0.5}s`}>
                    <Bubble id={`sml-bubble-${index}`} clickfunc={(e) => handleMiniClick(e)}
                    iscurrent={currentbubble===`sml-bubble-${index}`}
                    opacity={opacity} content={item.label} width={mini_bubble_size} height={mini_bubble_size} fontsize={"1.4rem"}></Bubble>
                </StyledMiniCircleItem>
                );
            })}
            {relatedKeywordData.data.slice(6,12).map((item, index) => {
                const angle = index * angleStep;
                const radian = (angle * Math.PI) / 180;
                const x = sml_radius * Math.cos(radian+Math.PI/6);
                const y = sml_radius * Math.sin(radian+Math.PI/6);
                
                return (                        
                <StyledMiniCircleItem key={index}
                    x={x} y={y} distance={mini_bubble_size} time={"1s"} delay={`${index * 0.5}s`}>
                    <Bubble id={`sml-bubble-${index}`} clickfunc={(e) => handleMiniClick(e)}
                    iscurrent={currentbubble===`sml-bubble-${index}`}
                    opacity={opacity} content={item.label} width={mini_bubble_size} height={mini_bubble_size} fontsize={"1.4rem"}></Bubble>
                </StyledMiniCircleItem>
                );
            })}        
            </StyledCircleContainer>
                                            
        </StyledBubbleContainer>   
            <StyledNewsContainer className="NewsContainer">

                    {shownewstab && (

                        <StyledNewsTab darkMode={darkMode} animate={clickedbubble}>
                            <StyledTitleBox className="related-text-box" animate={clickedbubble}>
                            <img src={sns} width={"50px"} height={"auto"}></img>                                 
                                <span>{keyword}과 {currentword}의 검색량을 비교해보세요. </span>
                            </StyledTitleBox>
                            <StyledGraphBox darkMode={darkMode} animate={clickedbubble}>  
                                                          
                                <RelatedKeywordChart darkMode={darkMode} keyword={keyword} related={currentword} ></RelatedKeywordChart>
                             </StyledGraphBox>
                        <StyledNaverbox darkMode={darkMode} animate={clickedbubble}>
                            {/* <NaverNews data={relatedNewsData} width={"680px"} Hfontsize={"0.8rem"} Cfontsize={"0.7rem"}></NaverNews> */}
                            <RelatedNews params2={params2}></RelatedNews>
                        </StyledNaverbox>
                        </StyledNewsTab> 
                    )}
                </StyledNewsContainer>          
        </StyledRelatedKeywordContainer>

  );
}