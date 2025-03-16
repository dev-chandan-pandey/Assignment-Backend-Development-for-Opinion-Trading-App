// import { useState } from "react";
// import { useRouter } from "next/router";
// import { api } from "@/utils/api";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await api.post("/auth/login", { email, password });
//       localStorage.setItem("token", data.token);
//       router.push("/dashboard");
//     } catch (err) {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleLogin}>
//         <h2 className="text-xl mb-4">Login</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 mb-3 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-3 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


// import { useState } from "react";
// import { useRouter } from "next/router";
// import styled from "styled-components";

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background: #f4f4f4;
// `;

// const Form = styled.form`
//   background: white;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
//   width: 300px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin: 10px 0;
//   border: 1px solid #ddd;
//   border-radius: 5px;
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background: #007bff;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   console.log({ email, password });
//   //   router.push("/dashboard");
//   // };
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await api.post("/auth/login", { email, password });
//       localStorage.setItem("token", data.token);
//       router.push("/dashboard");
//     } catch (err) {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <Container>
//       <Form onSubmit={handleLogin}>
//         <h2>Login</h2>
//         <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
//         <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
//         <Button type="submit">Login</Button>
//       </Form>
//     </Container>
//   );
// }
// import { useState } from "react";
// import { useRouter } from "next/router";
// import styled from "styled-components";
// import axios from "axios";

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background: #f4f4f4;
// `;

// const Form = styled.form`
//   background: white;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
//   width: 300px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin: 10px 0;
//   border: 1px solid #ddd;
//   border-radius: 5px;
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background: #007bff;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// const ErrorText = styled.p`
//   color: red;
//   font-size: 14px;
// `;

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       const { token } = response.data;
//       localStorage.setItem("token", token); // Store token
//       router.push("/dashboard"); // Redirect to dashboard
//     } catch (err) {
//       setError("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <Container>
//       <Form onSubmit={handleSubmit}>
//         <h2>Login</h2>
//         {error && <ErrorText>{error}</ErrorText>}
//         <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         <Button type="submit">Login</Button>
//       </Form>
//     </Container>
//   );
// }

import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import axios from "axios";
import Layout from "@/components/Layout";

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
      const response = await fetch("http://localhost:5000/api/auth/login", {
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
        <Button type="submit">Login</Button>
      </Form>
    </Container>
    </Layout>
   
  );
}

