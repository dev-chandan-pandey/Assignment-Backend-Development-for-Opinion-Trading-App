

import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import axios from "axios";
import Layout from "@/components/Layout";
import { baseURL } from "@/utils/api";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f4f4;
`;

const Form = styled.form`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(""); // Clear previous errors

  //   try {
  //     const response = await axios.post("http://localhost:5000/api/auth/login", {
  //       email,
  //       password,
  //     });

  //     const { token } = response.data;
  //     localStorage.setItem("token", token); // Store token
  //     router.push("/dashboard"); // Redirect to dashboard
  //   } catch (err) {
  //     setError("Invalid credentials. Please try again.");
  //   }
  // };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURL}api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();
      localStorage.setItem("token", data.token); // Save token for authentication
      localStorage.setItem("role", data.role);
      router.push("/dashboard"); // Redirect after successful login
    } catch (error) {
      setError("Login failed. Check credentials.");
    }
  };

  return (
    <Layout>
      <Container>
        <Form onSubmit={handleLogin}>
          <h2>Login</h2>
          {error && <ErrorText>{error}</ErrorText>}
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button  type="submit">Login</Button>
          <Button onClick={()=>{
            router.push('/register');
          }} type="submit">Go to Register </Button>
        </Form>
      </Container>
    </Layout>

  );
}

