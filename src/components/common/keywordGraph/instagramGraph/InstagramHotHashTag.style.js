import styled from "styled-components";

const colors = [
  "rgba(248, 169, 235, 0.7)", // #F8A9EB with transparency
  "rgba(249, 216, 169, 0.7)", // #F9D8A9 with transparency
  "rgba(237, 230, 251, 0.7)", // #EDE6FB with transparency
  "rgba(146, 157, 239, 0.7)", // #929DEF with transparency
  "rgba(235, 131, 152, 0.7)", // #EB8398 with transparency
];

const getRandomColorPair = () => {
  let color1 = colors[Math.floor(Math.random() * colors.length)];
  let color2 = colors[Math.floor(Math.random() * colors.length)];

  if (color2 === color1) {
    color2 = colors[(colors.indexOf(color1) + 1) % colors.length];
  }

  return [color1, color2];
};

const getRandomDirection = () => {
  const directions = [
    "to top",
    "to bottom",
    "to left",
    "to right",
    "to top right",
    "to bottom left",
  ];
  return directions[Math.floor(Math.random() * directions.length)];
};

export const generateRandomGradient = () => {
  const [color1, color2] = getRandomColorPair();
  const direction = getRandomDirection();
  return `linear-gradient(${direction}, ${color1}, ${color2})`;
};

export const StyledHotHashTag = styled.div`
  display: inline-block;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 25px;
  padding-right: 25px;
  border-radius: 50px;
  background: ${({ gradient }) => gradient};
  color: black; /* 텍스트 색상 */
  font-weight: bold; /* 텍스트 두께 */
  text-align: center; /* 텍스트 중앙 정렬 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 박스 그림자 추가 */
`;
