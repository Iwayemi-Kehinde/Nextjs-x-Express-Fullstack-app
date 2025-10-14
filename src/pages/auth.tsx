import { useState } from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import "../styles/global.css"
import Link from "next/link";

export default function AuthPage() {
  const [value, setValue] = useState("");

  return (
    <>
      <Link style={{padding: "20px", textDecoration: "none", color: "#3b82f6"}}  href="/" passHref>

          <h1 style={{background: " linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)", padding: "20px", textDecoration: "none"}} >RamzShops</h1>
          </Link>
          <Wrapper>
      <Card>
        <Emoji>🔐</Emoji>
        <Title>Sign In / Register</Title>
        <Subtitle>All data is safeguarded 🔒</Subtitle>

        <Form>
          <Input
            type="text"
            placeholder="Email or phone number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <ContinueButton>Continue </ContinueButton>
        </Form>

        <Divider>or</Divider>

        <SocialButtons>
          <SocialButton bg="#ffffff" border>
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </SocialButton>
          <SocialButton bg="#1877f2" color="#fff">
            <FaFacebook size={18} />
            <span>Continue with Facebook</span>
          </SocialButton>
          <SocialButton bg="#1da1f2" color="#fff">
            <FaTwitter size={18} />
            <span>Continue with Twitter</span>
          </SocialButton>
        </SocialButtons>

        <Terms>
          By continuing, you agree to our{" "}
          <a href="/terms">Terms of Use</a> and acknowledge that you’ve read our{" "}
          <a href="/privacy">Privacy Policy</a>.
        </Terms>
      </Card>
    </Wrapper>
    </>

  );
}

/* ---------- STYLES ---------- */

const Wrapper = styled.div`
font-family: Nunito;
  min-height: 100vh;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Card = styled.div`
  background: #fff;
  font-family: Nunito;
  width: 100%;
  margin-top: 20px;
  max-width: 380px;
  padding: 2.5rem;
  border-radius: 16px;
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;

  @media(max-width: 768px) {
    padding: .5rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Emoji = styled.div`
  font-size: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-top: 0.75rem;
  color: #111827;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const Form = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.85rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #3b82f6;
  }
`;

const ContinueButton = styled.button`
  background: #3b82f6;
  color: #fff;
  border: none;
  padding: 0.9rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #2563eb;
  }
`;

const Divider = styled.div`
  margin: 1.5rem 0;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: #9ca3af;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    height: 1px;
    width: 35%;
    top: 50%;
    background: #e5e7eb;
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SocialButton = styled.button<{ bg?: string; color?: string; border?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 10px;
  border: ${(p) => (p.border ? "1px solid #e5e7eb" : "none")};
  background: ${(p) => p.bg || "#fff"};
  color: ${(p) => p.color || "#111"};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }
`;

const Terms = styled.p`
  margin-top: 1.5rem;
  font-size: 0.75rem;
  color: #6b7280;

  a {
    color: #3b82f6;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
