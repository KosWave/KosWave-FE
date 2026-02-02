import styled from "styled-components";

export const HeaderContentDiv = styled.div`
  color: ${(props) => (props.darkMode ? "white" : "rgba(0, 0, 0, 0.7)")};

  background-color: ${(props) => (props.darkMode ? "#333333" : "white")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  padding-top: 0px;
  width: 100%;
  flex-wrap: wrap;
`;

export const GlowIcon = styled.div`
  position: absolute;
  right:20px;
  top:35px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 40px;
    height: 40px;
    color: #00537a;
    transition: filter 0.3s ease-in-out;

    &:hover {
      filter: ${(props) => (props.darkMode ? "drop-shadow(0 0 3px #E56717)" : "drop-shadow(0 0 3px rgba(0, 83, 122, 0.8))")};
    }
  }
`;

export const ContentText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: top;

  img {
    width: 60px;
    height: 60px;
  }

  span {
    font-size: 24px;
    color: #2e2e30;

    strong {
      font-size: 30px;
    }
  }
`;
