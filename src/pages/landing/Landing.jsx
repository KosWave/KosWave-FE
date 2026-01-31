import Bubble from "./Bubble";
import LandingSearch from "./Landing.Search";
import { StyledWapperDiv, StyledBubbleWapperDiv } from "./Landing.style";

const LandingPage = () => {
  const bubbleProps = [
    {
      width: "400px",
      height: "400px",
      top: "45%",
      left: "12%",
      time: "7s",
    },
    {
      width: "250px",
      height: "250px",
      top: "20%",
      left: "70%",
      time: "5s",
    },
    {
      width: "110px",
      height: "110px",
      top: "30%",
      left: "40%",
      time: "4s",
    },
    {
      width: "180px",
      height: "180px",
      top: "60%",
      left: "75%",
      time: "5s",
    },
  ];

  return (
    <StyledWapperDiv>
      <StyledBubbleWapperDiv>
        {bubbleProps.map((item, index) => (
          <Bubble
            key={index}
            width={item.width}
            height={item.height}
            top={item.top}
            left={item.left}
            time={item.time}
          />
        ))}
      </StyledBubbleWapperDiv>
      <LandingSearch />
    </StyledWapperDiv>
  );
};

export default LandingPage;
