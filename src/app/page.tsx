"use client";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Star } from "lucide-react";


const banners = [
  "/banners/banner1.jpeg",
  "/banners/banner2.jpeg",
  "/banners/banner3.png",
];

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    image: "/products/next.svg",
    price: "$49.99",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Smart Watch",
    image: "/products/file.svg",
    price: "$89.99",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    image: "/products/vercel.svg",
    price: "$39.99",
    rating: 4.4,
  },
  {
    id: 4,
    name: "Gaming Mouse",
    image: "/products/globe.svg",
    price: "$29.99",
    rating: 4.7,
  },
];

const Home: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll on desktop
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      timeoutRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % banners.length);
      }, 2500);
    }
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;
    const handleTouchEnd = (ev: TouchEvent) => {
      const touchEndX = ev.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) setCurrent((prev) => (prev + 1) % banners.length);
        else setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
      }
      window.removeEventListener("touchend", handleTouchEnd);
    };
    window.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <Headerr>

    <BannerWrapper onTouchStart={handleTouchStart}>
      <BannerTrack $current={current}>
        {banners.map((banner, i) => (
          <BannerImage key={i} src={banner} alt={`Banner ${i + 1}`} />
        ))}
      </BannerTrack>

      <Dots>
        {banners.map((_, i) => (
          <Dot key={i} $active={i === current} onClick={() => setCurrent(i)} />
        ))}
      </Dots>
    </BannerWrapper>

    <Section>
      <Header>
        <h2>🌟 Featured Products</h2>
        <ViewAll href="/products">View all →</ViewAll>
      </Header>

      <ProductsGrid>
        {featuredProducts.map((p) => (
          <Card key={p.id}>
            <ImageWrapper>
              <img src={p.image} alt={p.name} />
            </ImageWrapper>
            <Info>
              <ProductName>{p.name}</ProductName>
              <Price>{p.price}</Price>
              <Rating>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(p.rating) ? "#facc15" : "none"}
                    stroke="#facc15"
                  />
                ))}
              </Rating>
            </Info>
          </Card>
        ))}
      </ProductsGrid>
    </Section>
    </Headerr>
  );
};

export default Home;


const Headerr = styled.div`
margin: 50px 40px 60px 40px; /* adjust for your fixed navbar */
@media(max-width: 480px) {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  // height: 210px;
  // border-radius: 8px;
}
`

// 🎨 styled-components
const BannerWrapper = styled.div`
  // width: 100%;
  overflow: hidden;
  position: relative;
  height: 400px;
  border-radius: 12px;
  // margin: 50px 40px 60px 40px; /* adjust for your fixed navbar */
  @media(max-width: 480px) {
    // margin-left: 10px;
    // margin-right: 10px;
    // margin-top: 10px;
    height: 210px;
    border-radius: 8px;
  }
`;

const BannerTrack = styled.div<{ $current: number }>`
  display: flex;
  transition: transform 0.6s ease-in-out;
  transform: translateX(${(props) => -props.$current * 100}%);
`;

const BannerImage = styled.img`
  width: 100%;
  flex-shrink: 0;
  height: 400px;
  object-fit: cover;
`;

const Dots = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

const Dot = styled.div<{ $active?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(p) => (p.$active ? "#2563eb" : "#d1d5db")};
  cursor: pointer;
  transition: background 0.3s ease;
`;


const Section = styled.section`
  background-color: #f8faff;
  padding: 50px 20px;
  margin-top: 50px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  color: #1e40af;

  h2 {
    font-size: 1.6rem;
    font-weight: 700;

    @media(max-width: 480px) {
      font-size: 1rem;
    }
  }
`;

const ViewAll = styled.a`
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;

  /* 🟦 MOBILE VIEW */
  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 16px;
    padding-bottom: 10px;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;


const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    flex: 0 0 80%;
    scroll-snap-align: center;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 10px;
  overflow: hidden;
  background: #f1f5f9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const ProductName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
`;

const Price = styled.div`
  color: #2563eb;
  font-weight: 700;
  margin: 6px 0;
`;

const Rating = styled.div`
  display: flex;
  justify-content: center;
  gap: 2px;
`;