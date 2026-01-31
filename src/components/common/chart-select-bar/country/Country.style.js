import styled from "styled-components";

export const StyledNav = styled.nav`
  width: auto;
  max-width: 220px;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledNavItem = styled.a`
  text-decoration: none;
  font-size: 15px;
  color: ${(props) => (props.active ? "#43d2ff" : "rgba(0, 0, 0, 0.4)")};
  padding: 8px 30px;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 10px;
  border-color: ${(props) => (props.active ? "#43d2ff" : "")};
  background-color: ${(props) => (props.active ? "#ffffff" : "transparent")};
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "" : "rgba(0, 0, 0, 0.04)")};
    text-decoration: none;
    color: black;
  }
`;
