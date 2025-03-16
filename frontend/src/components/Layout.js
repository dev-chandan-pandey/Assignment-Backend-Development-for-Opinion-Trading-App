
import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding:0px;
  margin:0px; 
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
