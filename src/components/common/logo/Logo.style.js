import styled from "styled-components";

export const StyledLogoImg = styled.img`
  width: ${({ size }) =>
    size === "s" ? "50px" : size === "m" ? "150px" : "150px"};
  aspect-ratio: "4/2";
  margin-Top:20px;
  margin-Bottom:50px;
  width:170px;
  
`;
