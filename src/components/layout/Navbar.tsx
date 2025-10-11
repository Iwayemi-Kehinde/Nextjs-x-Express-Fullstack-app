"use client";

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Search, User, ShoppingCart } from "lucide-react";

const blue = {
  light: "#60A5FA",
  base: "#3B82F6",
  hover: "#2563EB",
};

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const [navHeight, setNavHeight] = useState(64); // fallback

  // compute nav height (keeps dropdown positioned exactly below nav)
  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        setNavHeight(Math.ceil(navRef.current.getBoundingClientRect().height));
      }
    };
    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);
    return () => window.removeEventListener("resize", updateNavHeight);
  }, []);

  // Detect scroll to change navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Nav $scrolled={scrolled}>
        <Container ref={navRef}>
          <Logo>Ramzshops</Logo>

          <DesktopSearchBar>
            <SearchForm>
              <SearchInput type="text" placeholder="Search for products..." />
              <SearchButton type="submit">
                <Search size={18} />
              </SearchButton>
            </SearchForm>
          </DesktopSearchBar>

          <IconGroup>
            <MobileSearchButton onClick={() => setShowSearch((s) => !s)} $active={showSearch}>
              <Search size={20} />
            </MobileSearchButton>

            <IconButton>
              <User size={22} />
            </IconButton>

            <CartButton>
              <ShoppingCart size={22} />
              <CartBadge>2</CartBadge>
            </CartButton>
          </IconGroup>
        </Container>
      </Nav>

      {/* Mobile Search Dropdown — positioned using measured navHeight */}
      <MobileSearchWrapper
        $visible={showSearch}
        style={{
          top: `${navHeight}px`, // <-- important: placed exactly below the nav
          zIndex: 200,           // make sure this is ABOVE the Nav z-index
        }}
      >
        <SearchForm>
          <SearchInput type="text" placeholder="Search for products..." />
          <SearchButton type="submit">
            <Search size={18} />
          </SearchButton>
        </SearchForm>
      </MobileSearchWrapper>

      {/* Overlay for Mobile Search — below Nav but above page content */}
      {showSearch && <Overlay onClick={() => setShowSearch(false)} />}
    </>
  );
}

/* ---------------- Styled Components ---------------- */

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 150; /* keep this high but MobileSearchWrapper uses >150 to show above */
  transition: all 0.3s ease;
  background: ${({ $scrolled }) => ($scrolled ? "white" : "rgba(255,255,255,0.92)")};
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${({ $scrolled }) => ($scrolled ? "#E5E7EB" : "transparent")};
  box-shadow: ${({ $scrolled }) => ($scrolled ? "0 2px 6px rgba(0,0,0,0.08)" : "none")};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (min-width: 768px) {
    padding: 12px 32px;
  }
`;

const Logo = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${blue.base};
`;

const DesktopSearchBar = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    flex: 1;
    justify-content: center;
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px 0 0 6px;
  outline: none;
  font-size: 15px;
  color: black;
  font-family: Nunito;


  &::placeholder {
    color: black;
    opacity: 0.7;
    font-family: Nunito;
  }

  &:focus {
    border-color: ${blue.light};
  }
`;

const SearchButton = styled.button`
  height: 42px;
  width: 48px;
  background: ${blue.base};
  border: 1px solid ${blue.base};
  border-radius: 0 6px 6px 0;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.25s ease;

  &:hover {
    background: ${blue.hover};
  }
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  color: #4b5563;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${blue.base};
  }
`;

const MobileSearchButton = styled(IconButton)<{ $active: boolean }>`
  display: flex;

  @media (min-width: 768px) {
    display: none;
  }

  color: ${({ $active }) => ($active ? blue.base : "#4b5563")};
`;

const CartButton = styled(IconButton)`
  position: relative;
`;

const CartBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -8px;
  background: ${blue.base};
  color: white;
  font-size: 11px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* Mobile dropdown — use position: fixed and top is provided inline via style prop */
const MobileSearchWrapper = styled.div<{ $visible: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  /* top is set inline to the exact nav height to avoid overlap */
  background: white;
  padding: ${({ $visible }) => ($visible ? "12px 16px" : "0 16px")};
  border-bottom: 1px solid #e5e7eb;
  z-index: 200; /* must be > Nav.z-index to be visible */
  transform: translateY(${({ $visible }) => ($visible ? "0" : "-10px")});
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  transition: all 0.22s cubic-bezier(.2,.9,.2,1);
  box-shadow: ${({ $visible }) => ($visible ? "0 2px 6px rgba(0,0,0,0.06)" : "none")};

  @media (min-width: 768px) {
    display: none;
  }
`;

/* Overlay should be below Nav but above content — keep it lower than MobileSearchWrapper but high enough */
const Overlay = styled.div`
  position: fixed;
  inset: 0;           /* full screen */
  background: rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(3px);
  z-index: 145;       /* < Nav (150) and < MobileSearchWrapper (200), so it won't cover the nav */
  @media (min-width: 768px) {
    display: none;
  }
`;
