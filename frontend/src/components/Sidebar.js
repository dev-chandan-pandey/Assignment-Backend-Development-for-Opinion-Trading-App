
import styled from "styled-components";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: #222;
  color: white;
  padding: 20px;
  overflow-y: auto;
`;

const MenuItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  transition: 0.3s;
  
  a {
    text-decoration: none;
    color: white;
    display: block;
  }

  &:hover {
    background: #444;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: auto;

  &:hover {
    background: #0056b3;
  }
`;

export default function Sidebar() {
  const [role, setRole] = useState(null);
  const router = useRouter();
  const [token , setToken]= useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    setToken(token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
    router.push("/");
  };

  return (
    <SidebarContainer>
      <h2>Menu</h2>
      
      <MenuItem>
        <Link href="/dashboard">Dashboard</Link>
      </MenuItem>

      {role === "admin" && (
        <MenuItem>
          <Link href="/admin">Admin Panel</Link>
        </MenuItem>
      )}

      <MenuItem>
      {token&&<Button onClick={handleLogout}>Logout</Button>}
        
      </MenuItem>
    </SidebarContainer>
  );
}
