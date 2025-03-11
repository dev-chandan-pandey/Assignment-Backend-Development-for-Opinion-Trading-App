// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

// const Layout = ({ children }) => {
//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex-1">
//         <Navbar />
//         <main className="p-6">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default Layout;


// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

// const Layout = ({ children }) => {
//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex-1">
//         <Navbar />
//         <main className="p-6">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default Layout;




import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

export default function Layout({ children }) {
  return (
    <LayoutContainer>
      <Sidebar />
      <Content>
        <Navbar />
        {children}
      </Content>
    </LayoutContainer>
  );
}
