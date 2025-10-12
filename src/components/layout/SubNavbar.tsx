"use client";

import { useRef, useState } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty & Health",
  "Sports",
  "Groceries",
  "Books",
  "Toys",
  "Automobile",
  "Pets",
  "Beauty & Health",
  "Sports",
  "Groceries",
  "Books",
  "Toys",
  "Automobile",
  "Pets",
  "Beauty & Health",
  "Sports",
  "Groceries",
  "Books",
  "Toys",
  "Automobile",
  "Pets",
];

export default function SubNavbar() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Electronics");

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 250;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Wrapper>
              <FadeLeft />
      <ScrollButtonLeft onClick={() => scroll("left")}>
        <ChevronLeft size={18} />
      </ScrollButtonLeft>

      <ScrollContainer ref={scrollRef}>
        {categories.map((cat, index) => (
          <CategoryWrapper key={cat}>
            <Category
              $active={cat === activeCategory}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Category>
            {index < categories.length - 1 && <Divider />}
          </CategoryWrapper>
        ))}
      </ScrollContainer>

      <ScrollButtonRight onClick={() => scroll("right")}>
        <ChevronRight size={18} />
      </ScrollButtonRight>
      <FadeRight />

    </Wrapper>
  );
}

//
// Styled Components
//

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-top: 1px solid #dbeafe; /* subtle light blue line */
  border-bottom: 1px solid #dbeafe; /* subtle light blue line */
  width: 100%;
  overflow: hidden;
`;

const ScrollContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.7rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0.9rem 16px;
  width: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Category = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? "#EFF6FF" : "transparent")};
  color: ${({ $active }) => ($active ? "#2563EB" : "#374151")};
  border: 1px solid ${({ $active }) => ($active ? "#93C5FD" : "transparent")};
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 20px;
  padding: 0.35rem 1rem;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  font-family: Nunito;

  @media(max-width: 400px) {
    padding: 0.35rem;
  }

  &:hover {
    color: #2563eb;
    background: #f3f7ff;
    transform: translateY(-1px);
  }
`;

const Divider = styled.span`
  width: 1px;
  height: 18px;
  background-color: #e5e7eb;
  margin-left: 1.75rem;
`;

const ScrollButtonBase = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: #6b7280;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    color: #2563eb;
  }

  @media (min-width: 768px) {
    display: flex;
  }
`;

const ScrollButtonLeft = styled(ScrollButtonBase)`
  left: 10px;
  z-index: 3;
`;

const ScrollButtonRight = styled(ScrollButtonBase)`
  right: 10px;
  z-index: 3;

`;

/* ✨ Gradient fade edges */
const FadeLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 16px;
  background: linear-gradient(to right, white 60%, transparent);
  pointer-events: none;
  z-index: 5;
`;

const FadeRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 16px;
  background: linear-gradient(to left, white 60%, transparent);
  pointer-events: none;
  z-index: 5;
`;
