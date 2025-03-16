
import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
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
  background: #28a745;
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

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch(`${baseURL}api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json(); 

      if (!response.ok) {
        setError(data.error || "Registration failed");
        return 
      
      }

      alert("Registration successful!");
      router.push("/login"); 
    } catch (err) {
      setError(err.message);
      console.error("Error registering:", err);
    }
  };

  return (
    <Layout>
      <Container>
        <Form onSubmit={handleRegister}>
          <h2>Register</h2>
          {error && <ErrorText>{error}</ErrorText>}
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Register</Button>
          <Button onClick={()=>{
            router.push('/login');
          }} type="submit">Go to Login </Button>
        </Form>
      </Container>
    </Layout>
  );
}
