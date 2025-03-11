// import { useRouter } from "next/router";

// const Navbar = () => {
//   const router = useRouter();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     router.push("/login");
//   };

//   return (
//     <nav className="bg-gray-900 text-white p-4 flex justify-between">
//       <h1 className="text-xl font-bold cursor-pointer" onClick={() => router.push("/dashboard")}>
//         Opinion Trading App
//       </h1>
//       <div className="space-x-4">
//         <button onClick={() => router.push("/dashboard")} className="hover:underline">Dashboard</button>
//         {localStorage.getItem("role") === "admin" && (
//           <button onClick={() => router.push("/admin")} className="hover:underline">Admin Panel</button>
//         )}
//         <button onClick={handleLogout} className="hover:underline">Logout</button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// import { useRouter } from "next/router";

// const Navbar = () => {
//   const router = useRouter();

//   return (
//     <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
//       <h1 className="text-xl font-bold cursor-pointer" onClick={() => router.push("/dashboard")}>
//         📊 Opinion Trading App
//       </h1>
//       <button onClick={() => router.push("/login")} className="bg-red-500 px-4 py-2 rounded">
//         Logout
//       </button>
//     </nav>
//   );
// };

// export default Navbar;
// frontend/src/components/Navbar.js
// import React from "react";

// const Navbar = () => {
//   return (
//     <nav className="bg-blue-600 text-white p-4 fixed w-full top-0 shadow-md">
//       <div className="flex justify-between items-center">
//         <h1 className="text-xl font-bold">📊 Opinion Trading App</h1>
//         <button className="bg-red-500 px-3 py-1 rounded hover:bg-red-700">
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import { useRouter } from "next/router";

// const Navbar = () => {
//   const router = useRouter();

//   return (
//     <nav className="bg-blue-600 text-white p-4 fixed w-full top-0 shadow-md">
//       <div className="flex justify-between items-center">
//         <h1 className="text-xl font-bold">📊 Opinion Trading App</h1>
//         <button onClick={() => router.push("/login")} className="bg-red-500 px-3 py-1 rounded hover:bg-red-700">
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import styled from "styled-components";

const NavbarContainer = styled.nav`
  background: #333;
  color: white;
  padding: 15px;
  text-align: center;
`;

export default function Navbar() {
  return <NavbarContainer>Opinion Trading App</NavbarContainer>;
}
