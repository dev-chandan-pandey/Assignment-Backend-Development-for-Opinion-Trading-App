// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { api } from "@/utils/api";
// import io from "socket.io-client";
// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";
// const Dashboard = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [choice, setChoice] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     // Fetch initial events
//     const fetchEvents = async () => {
//       try {
//         const { data } = await api.get("/events", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setEvents(data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEvents();

//     // WebSocket Connection for Live Updates
//     const socket = io("http://localhost:5000"); // Change to deployed backend URL
//     socket.on("liveEvents", (updatedEvents) => {
//       setEvents(updatedEvents);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleTrade = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await api.post(
//         "/trades",
//         { eventId: selectedEvent, amount, choice },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Trade placed successfully!");
//     } catch (error) {
//       alert("Failed to place trade.");
//     }
//   };

//   return (
//     <div className="p-6">
// <Navbar />
// <Sidebar />
//       <h1 className="text-2xl font-bold mb-4">Live Events</h1>
//       <ul className="space-y-2">
//         {events.map((event) => (
//           <li key={event.eventId} className="border p-4 rounded shadow">
//             <h2 className="text-lg font-semibold">{event.name}</h2>
//             <p>Odds: {event.odds.home} / {event.odds.away}</p>
//             <button
//               onClick={() => setSelectedEvent(event.eventId)}
//               className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Place Trade
//             </button>
//           </li>
//         ))}
//       </ul>

//       {selectedEvent && (
//         <div className="mt-6 p-4 border rounded shadow">
//           <h2 className="text-lg font-bold">Place Trade</h2>
//           <input
//             type="number"
//             placeholder="Amount"
//             className="w-full p-2 mb-2 border rounded"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//           <select
//             className="w-full p-2 mb-2 border rounded"
//             value={choice}
//             onChange={(e) => setChoice(e.target.value)}
//           >
//             <option value="">Select Team</option>
//             <option value="home">Home Team</option>
//             <option value="away">Away Team</option>
//           </select>
//           <button
//             onClick={handleTrade}
//             className="w-full bg-green-500 text-white p-2 rounded"
//           >
//             Submit Trade
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
// import Layout from "@/components/Layout";

// export default function Dashboard() {
//   return (
//     <Layout>
//       <h1 className="text-2xl font-bold">📊 Dashboard</h1>
//       <p>Welcome to your dashboard! Here you will see live events and trades.</p>
//     </Layout>
//   );
// }

// frontend/src/pages/dashboard.js
// import React from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// const Dashboard = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="w-full min-h-screen bg-gray-100 pt-16 px-6">
//         <Navbar />
//         <h1 className="text-3xl font-bold mt-6">📈 Dashboard</h1>
//         <p>Welcome to your dashboard! Here you will see live events and trades.</p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import { useEffect, useState } from "react";
// import Layout from "@/components/Layout";
// import { api } from "@/utils/api";
// import io from "socket.io-client";

// const Dashboard = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [choice, setChoice] = useState("");

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const { data } = await api.get("/events");
//         setEvents(data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEvents();
//     const socket = io("http://localhost:5000"); // Change to deployed backend URL
//     socket.on("liveEvents", (updatedEvents) => setEvents(updatedEvents));

//     return () => socket.disconnect();
//   }, []);

//   const handleTrade = async () => {
//     try {
//       await api.post("/trades", { eventId: selectedEvent, amount, choice });
//       alert("Trade placed successfully!");
//     } catch (error) {
//       alert("Failed to place trade.");
//     }
//   };

//   return (
//     <Layout>
//       <h1 className="text-2xl font-bold">📊 Live Events</h1>
//       <ul>
//         {events.map((event) => (
//           <li key={event.eventId} className="border p-4 rounded shadow">
//             <h2>{event.name}</h2>
//             <button onClick={() => setSelectedEvent(event.eventId)}>Place Trade</button>
//           </li>
//         ))}
//       </ul>
//       {selectedEvent && (
//         <div>
//           <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
//           <select value={choice} onChange={(e) => setChoice(e.target.value)}>
//             <option value="">Select Team</option>
//             <option value="home">Home Team</option>
//             <option value="away">Away Team</option>
//           </select>
//           <button onClick={handleTrade}>Submit Trade</button>
//         </div>
//       )}
//     </Layout>
//   );
// };

// export default Dashboard;

// import { useEffect, useState } from "react";
// import { fetchLiveEvents } from "@/utils/api";
// import styled from "styled-components";
// import Layout from "@/components/Layout";

// const Container = styled.div`
//   padding: 20px;
// `;

// const EventCard = styled.div`
//   border: 1px solid #ddd;
//   padding: 15px;
//   margin: 10px 0;
//   border-radius: 5px;
//   background: white;
//   box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
// `;

// export default function Dashboard() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     async function loadEvents() {
//       const data = await fetchLiveEvents();
//       setEvents(data);
//     }
//     loadEvents();
//   }, []);

//   return (
//     <Layout>
//   <Container>
//       <h2>Live Events</h2>
//       {events.length > 0 ? (
//         events.map((event) => (
//           <EventCard key={event._id}>
//             <h3>{event.title}</h3>
//             <p>{event.description}</p>
//             <p><strong>Start Time:</strong> {new Date(event.startTime).toLocaleString()}</p>
//           </EventCard>
//         ))
//       ) : (
//         <p>No live events available.</p>
//       )}
//     </Container>
//     </Layout>
  
//   );
// }

import { useEffect, useState } from "react";
import { fetchLiveEvents, placeTrade } from "@/utils/api";
import styled from "styled-components";
import Layout from "@/components/Layout";

const Container = styled.div`
  padding: 20px;
`;

const EventCard = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  background: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const TradeSection = styled.div`
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;

  &:hover {
    background: #0056b3;
  }
`;

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [amount, setAmount] = useState("");
  const [choice, setChoice] = useState("");

  useEffect(() => {
    async function loadEvents() {
      const data = await fetchLiveEvents();
      setEvents(data);
    }
    loadEvents();
  }, []);

  const handleTrade = async () => {
    if (!selectedEvent || !amount || !choice) {
      alert("Please fill in all fields.");
      return;
    }

    const result = await placeTrade(selectedEvent, amount, choice);
    if (result) {
      alert("Trade placed successfully!");
      setAmount("");
      setChoice("");
    } else {
      alert("Trade failed.");
    }
  };

  return (
    <Layout>
<Container>
      <h2>Live Events</h2>
      {events.length > 0 ? (
        events.map((event) => (
          <EventCard key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Start Time:</strong> {new Date(event.startTime).toLocaleString()}</p>
            <TradeSection>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <select value={choice} onChange={(e) => setChoice(e.target.value)}>
                <option value="">Select Team</option>
                <option value="home">Home</option>
                <option value="away">Away</option>
              </select>
              <Button onClick={() => setSelectedEvent(event._id)}>Select Event</Button>
              <Button onClick={handleTrade}>Place Trade</Button>
            </TradeSection>
          </EventCard>
        ))
      ) : (
        <p>No live events available.</p>
      )}
    </Container>
    </Layout>
    
  );
}
