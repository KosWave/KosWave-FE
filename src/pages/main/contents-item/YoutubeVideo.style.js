import styled, { css } from 'styled-components';

export const SliderContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const Slide = styled.div`
  outline: none;
`;

export const SlideImage = styled.img`
  display: block;
  width: 100%;
  border-radius: 10px;
`;

export const SlideContent = styled.div`
  padding: 8px;
  text-align: center;
`;
export const Title = styled.div`
color: ${(props) => (props.darkMode ? "white" : "black")};
margin-left:-12.7px;
width:120%;  
font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Channel = styled.div`
  font-size: 10px;
  color: #666;
  color: ${(props) => (props.darkMode ? "#ddd" : "#666")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const CenteredSlideWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction:column;
`;

export const CenteredSlideImage = styled(SlideImage)`
  margin-top:20px;
  width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s, opacity 0.3s;
  margin-bottom:7px;
  img{
    height:100px;
  }
  ${props => props.isCenter && css`
    transform: scale(1.05);
    opacity: 1;
  `}

  ${props => !props.isCenter && css`
    transform: scale(0.65);
    opacity: 0.5;
  `}
`;

export const CenteredSlideContent = styled(SlideContent)`
  width: 100%;
  ${props => props.isCenter && css`
    transform: scale(1);
  `}

  ${props => !props.isCenter && css`
    transform: scale(0.8);
  `}
`;
export const CustomArrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  cursor: pointer;
  top: 50%; 
  transform: translateY(-50%);
  position: absolute;
  
  &:hover {
    color: #43D2FF;
  }

  &.slick-prev {
    left: -30px;
  }

  &.slick-next {
    right: -30px;
  }
`;
