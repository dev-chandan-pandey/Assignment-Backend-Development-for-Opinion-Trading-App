// import Layout from "@/components/Layout";
// import { useRouter } from "next/router";
// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// import Layout from "@/components/Layout";

// const socket = io('http://localhost:5000');

// const LiveTrades = () => {
//   const [events, setEvents] = useState([]);
//   const [trades, setTrades] = useState([]);

//   useEffect(() => {
//     socket.on('liveEvents', (data) => {
//       setEvents(data);
//     });

//     socket.on('liveTrades', (data) => {
//       setTrades(data);
//     });

//     return () => {
//       socket.off('liveEvents');
//       socket.off('liveTrades');
//     };
//   }, []);

//   return (
//     <div>
//       <h2>Live Events</h2>
//       <ul>{events.map(e => <li key={e.eventId}>{e.name}</li>)}</ul>
      
//       <h2>Live Trades</h2>
//       <ul>{trades.map(t => <li key={t._id}>{t.choice} - {t.status}</li>)}</ul>
//     </div>
//   );
// };

// import Layout from "@/components/Layout";
// import { useRouter } from "next/router";
// export default function Home() {
//   const router = useRouter();

//   return (
//     <Layout>
//       <div>
//         <h1>Welcome to the Opinion Trading App</h1>
//         <div>
//           <button onClick={() => router.push("/register")}>Register</button>
//           <button onClick={() => router.push("/login")}>Login</button>
//           <button onClick={() => router.push("/dashboard")}>Dashboard</button>
//         </div>
//         {/* <LiveTrades/> */}
//       </div>
//     </Layout>
//   );
// }


import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Layout from "@/components/Layout";

const socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000");

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

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 auto;
  max-width: 400px;
  text-align: left;
`;

const ListItem = styled.li`
  background: #f8f8f8;
  margin: 10px 0;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  color: #333;

  span {
    font-weight: bold;
    color: #0070f3;
  }
`;

const ResponsiveWrapper = styled.div`
  max-width: full;
  margin: 0px;
  padding: 5px;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: auto;
  background: #f9f9f9;
  border-radius: 8px;
  max-height: 350px; 
  overflow: auto; 
  @media (max-width: 600px) {
    max-width: 90%;
    padding: 15px;
  }
`;

// Live Trades Component
const LiveTrades = () => {
  const [events, setEvents] = useState([]);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000");

    socket.on("liveEvents", setEvents);
    socket.on("liveTrades", setTrades);

    return () => {
      socket.off("liveEvents", setEvents);
      socket.off("liveTrades", setTrades);
    };
  }, []);

  return (
    <Container>
      <ResponsiveWrapper>
        <Title>Live Events</Title>
        <List>
          {events.length ? (
            events.map((e) => <ListItem key={e._id}>{e.name}</ListItem>)
          ) : (
            <EmptyText>No events at the moment</EmptyText>
          )}
        </List>

        <Title>Live Trades</Title>
        <List>
        {trades.length ? (
  trades.map((t) => (
    <ListItem key={t._id}>
      {t.choice} - <span>{t.status}</span>
    </ListItem>
  ))
) : (
  <EmptyText>No live trades currently</EmptyText>
)}

        </List>
      </ResponsiveWrapper>
    </Container>
  );
};

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
      <LiveTrades />
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

