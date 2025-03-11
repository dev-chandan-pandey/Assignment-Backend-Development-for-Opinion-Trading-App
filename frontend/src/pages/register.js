// import { useState } from "react";
// import { useRouter } from "next/router";
// import { api } from "@/utils/api";

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/auth/register", { username, email, password });
//       router.push("/login");
//     } catch (err) {
//       setError("Registration failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleRegister}>
//         <h2 className="text-xl mb-4">Register</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         <input
//           type="text"
//           placeholder="Username"
//           className="w-full p-2 mb-3 border rounded"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
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
//         <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;
import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

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
`;

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    router.push("/dashboard");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit">Register</Button>
      </Form>
    </Container>
  );
}
