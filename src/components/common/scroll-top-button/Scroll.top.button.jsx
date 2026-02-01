// src/components/ScrollToTopButton.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowUp } from "react-icons/io";

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-color: #E56717;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  font-size: 24px;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export default function ScrollToTopButton({ scrollRef }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (scrollRef.current && scrollRef.current.scrollTop > 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    if (scrollRef.current) {
      scrollRef.current?.addEventListener("scroll", toggleVisibility);

      return () =>
        scrollRef.current?.removeEventListener("scroll", toggleVisibility);
    }
  }, [scrollRef]);

  const scrollToTop = () => {
    scrollRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button onClick={scrollToTop} visible={visible}>
      <IoIosArrowUp />
    </Button>
  );
}
