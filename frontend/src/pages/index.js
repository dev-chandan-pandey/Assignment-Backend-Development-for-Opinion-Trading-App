

import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Layout from "@/components/Layout";
import { baseURL } from "@/utils/api";

const socket = io(`${baseURL}`||process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000");

// Styled Components
const Container = styled.div`
  font-family: "Arial", sans-serif;
  margin:0px;
  padding:0px;
  max-width: 800px;
  height:full; 
  text-align: center; 
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background: #0070f3;
  color: white;
  border: none;
  padding: 12px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #005bb5;
  }
`;
// Home Component with buttons
export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <PageContainer>
        <Title>Welcome to the Opinion Trading App</Title>
        <ButtonContainer>
          <Button onClick={() => router.push("/register")}>Register</Button>
          <Button onClick={() => router.push("/login")}>Login</Button>
          <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
        </ButtonContainer>
       
      </PageContainer>
    </Layout>
  );
}

// Additional Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f4f4f4;
  min-height: auto;
  overflow: auto; 
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    
    button {
      width: 100%;
    }
  }
`;

const EmptyText = styled.p`
  color: gray;
  font-style: italic;
  text-align: center;
`;

