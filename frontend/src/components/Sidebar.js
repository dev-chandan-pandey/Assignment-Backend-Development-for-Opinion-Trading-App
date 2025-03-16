// import { useState } from "react";
// import { useRouter } from "next/router";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();

//   return (
//     <div className="relative">
//       <button onClick={() => setIsOpen(!isOpen)} className="p-3 text-white bg-gray-800 fixed top-4 left-4 rounded">
//         ☰
//       </button>

//       <div className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 transform ${isOpen ? "translate-x-0" : "-translate-x-64"} transition-transform`}>
//         <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-xl">✖</button>
//         <h2 className="text-2xl font-bold mb-6">Menu</h2>
//         <ul className="space-y-4">
//           <li className="cursor-pointer hover:underline" onClick={() => router.push("/dashboard")}>Dashboard</li>
//           {localStorage.getItem("role") === "admin" && (
//             <li className="cursor-pointer hover:underline" onClick={() => router.push("/admin")}>Admin Panel</li>
//           )}
//           <li className="cursor-pointer hover:underline" onClick={() => { localStorage.clear(); router.push("/login"); }}>Logout</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
// import { useState } from "react";
// import { useRouter } from "next/router";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();

//   return (
//     <div className="relative">
//       <button onClick={() => setIsOpen(!isOpen)} className="p-3 text-white bg-gray-800 fixed top-4 left-4 rounded">
//         ☰
//       </button>

//       <div className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 transform ${isOpen ? "translate-x-0" : "-translate-x-64"} transition-transform`}>
//         <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-xl">✖</button>
//         <h2 className="text-2xl font-bold mb-6">Menu</h2>
//         <ul className="space-y-4">
//           <li className="cursor-pointer hover:underline" onClick={() => router.push("/dashboard")}>📊 Dashboard</li>
//           <li className="cursor-pointer hover:underline" onClick={() => router.push("/admin")}>⚙ Admin Panel</li>
//           <li className="cursor-pointer hover:underline" onClick={() => router.push("/login")}>🚪 Logout</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// frontend/src/components/Sidebar.js
// import React, { useState } from "react";
// import { FaBars, FaTimes, FaChartBar, FaUserShield, FaSignOutAlt } from "react-icons/fa";
// import Link from "next/link";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div>
//       {/* Menu Toggle Button */}
//       <button
//         className="p-3 bg-gray-800 text-white fixed top-4 left-4 rounded-full"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
//       </button>

//       {/* Sidebar Content */}
//       <div
//         className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-5 transition-transform ${
//           isOpen ? "translate-x-0" : "-translate-x-64"
//         }`}
//       >
//         <h2 className="text-2xl font-bold mb-6">📊 Menu</h2>
//         <ul className="space-y-4">
//           <li>
//             <Link href="/dashboard" className="flex items-center gap-2">
//               <FaChartBar /> Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link href="/admin" className="flex items-center gap-2">
//               <FaUserShield /> Admin Panel
//             </Link>
//           </li>
//           <li>
//             <button className="flex items-center gap-2 text-red-500">
//               <FaSignOutAlt /> Logout
//             </button>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import { useState } from "react";
// import { useRouter } from "next/router";
// import { FaBars, FaTimes, FaChartBar, FaUserShield, FaSignOutAlt } from "react-icons/fa";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();

//   return (
//     <div>
//       <button className="p-3 bg-gray-800 text-white fixed top-4 left-4 rounded-full" onClick={() => setIsOpen(!isOpen)}>
//         {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
//       </button>

//       <div className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-5 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-64"}`}>
//         <h2 className="text-2xl font-bold mb-6">📊 Menu</h2>
//         <ul className="space-y-4">
//           <li onClick={() => router.push("/dashboard")} className="cursor-pointer hover:underline flex items-center gap-2">
//             <FaChartBar /> Dashboard
//           </li>
//           <li onClick={() => router.push("/admin")} className="cursor-pointer hover:underline flex items-center gap-2">
//             <FaUserShield /> Admin Panel
//           </li>
//           <li onClick={() => router.push("/login")} className="cursor-pointer hover:underline flex items-center gap-2 text-red-500">
//             <FaSignOutAlt /> Logout
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import styled from "styled-components";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// const SidebarContainer = styled.div`
//   width: 250px;
//   background: #222;
//   color: white;
//   padding: 20px;
  
// `;

// const MenuItem = styled.div`
//   padding: 10px;
//   &:hover {
//     background: #444;
//   }
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
// export default function Sidebar() {
//   const [role, setRole] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const userRole = localStorage.getItem("role");
//     setRole(userRole);
//   }, []);
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     setRole(null);
//     router.push("/login");
//   };
//   return (
//     <SidebarContainer>
//       <h2>Menu</h2>
//       <MenuItem>
//         <Link style={{textDecoration:'none'}} href="/dashboard">Dashboard</Link>
//       </MenuItem>
//       <MenuItem>
//         {/* <Link style={{textDecoration:'none'}} href="/admin">Admin Panel</Link> */}
//         {role === "admin" && <Link style={{textDecoration:'none'}} href="/admin">Admin Panel</Link>}
//       </MenuItem>
//       <MenuItem>
//         {/* <Link style={{textDecoration:'none'}} href="/login">Logout</Link> */}
//         <Button onClick={handleLogout}>Logout</Button>
//       </MenuItem>
//     </SidebarContainer>
//   );
// }


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
    router.push("/login");
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
