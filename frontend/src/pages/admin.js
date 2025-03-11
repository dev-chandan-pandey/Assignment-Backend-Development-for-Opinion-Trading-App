// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { api } from "@/utils/api";

// const AdminDashboard = () => {
//   const [events, setEvents] = useState([]);
//   const [trades, setTrades] = useState([]);
//   const [newEvent, setNewEvent] = useState({ name: "", sport: "", odds: { home: 1.5, away: 2.0 }, startTime: "" });
//   const router = useRouter();

  
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         const role = localStorage.getItem("role");
      
//         if (!token || role !== "admin") {
//           router.push("/login");
//         }
//       }, []);
      
//     const fetchData = async () => {
//       try {
//         const { data: eventsData } = await api.get("/events", { headers: { Authorization: `Bearer ${token}` } });
//         setEvents(eventsData);

//         const { data: tradesData } = await api.get("/admin/trades", { headers: { Authorization: `Bearer ${token}` } });
//         setTrades(tradesData);
//       } catch (error) {
//         console.error("Error fetching admin data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCreateEvent = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await api.post("/admin/events", newEvent, { headers: { Authorization: `Bearer ${token}` } });
//       alert("Event created!");
//       setNewEvent({ name: "", sport: "", odds: { home: 1.5, away: 2.0 }, startTime: "" });
//     } catch (error) {
//       alert("Failed to create event.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

//       {/* Create Event */}
//       <div className="p-4 border rounded shadow mb-6">
//         <h2 className="text-lg font-bold">Create New Event</h2>
//         <input type="text" placeholder="Event Name" className="w-full p-2 mb-2 border rounded"
//           value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
//         <input type="text" placeholder="Sport Type" className="w-full p-2 mb-2 border rounded"
//           value={newEvent.sport} onChange={(e) => setNewEvent({ ...newEvent, sport: e.target.value })} />
//         <input type="datetime-local" className="w-full p-2 mb-2 border rounded"
//           value={newEvent.startTime} onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })} />
//         <button onClick={handleCreateEvent} className="w-full bg-blue-500 text-white p-2 rounded">Create Event</button>
//       </div>

//       {/* Events List */}
//       <h2 className="text-xl font-semibold mt-6">Live Events</h2>
//       <ul className="space-y-2">
//         {events.map((event) => (
//           <li key={event.eventId} className="border p-4 rounded shadow">
//             <h2 className="text-lg font-semibold">{event.name}</h2>
//             <p>Sport: {event.sport}</p>
//             <p>Odds: {event.odds.home} / {event.odds.away}</p>
//             <p>Start Time: {new Date(event.startTime).toLocaleString()}</p>
//           </li>
//         ))}
//       </ul>

//       {/* Trades List */}
//       <h2 className="text-xl font-semibold mt-6">Trades</h2>
//       <ul className="space-y-2">
//         {trades.map((trade) => (
//           <li key={trade._id} className="border p-4 rounded shadow">
//             <p>User: {trade.user.username}</p>
//             <p>Event: {trade.event.name}</p>
//             <p>Amount: ${trade.amount}</p>
//             <p>Choice: {trade.choice}</p>
//             <p>Status: <span className={trade.status === "won" ? "text-green-500" : "text-red-500"}>{trade.status}</span></p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminDashboard;
// import Layout from "@/components/Layout";

// export default function AdminPanel() {
//   return (
//     <Layout>
//       <h1 className="text-2xl font-bold">⚙ Admin Panel</h1>
//       <p>Manage events and trades from here.</p>
//     </Layout>
//   );
// }


// import Layout from "@/components/Layout";
// import styled from "styled-components";

// const AdminContainer = styled.div`
//   padding: 20px;
// `;

// const Title = styled.h1`
//   font-size: 24px;
//   font-weight: bold;
//   margin-bottom: 20px;
// `;

// const Section = styled.div`
//   background: #f4f4f4;
//   padding: 15px;
//   margin-bottom: 20px;
//   border-radius: 5px;
// `;

// export default function AdminPanel() {
//   return (
//     <Layout>
//       <AdminContainer>
//         <Title>Admin Panel</Title>

//         <Section>
//           <h2>Manage Events</h2>
//           <p>Here admins can create, edit, and delete events.</p>
//         </Section>

//         <Section>
//           <h2>Manage Trades</h2>
//           <p>Admins can approve or reject trade requests.</p>
//         </Section>
//       </AdminContainer>
//     </Layout>
//   );
// }


import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { fetchAllTrades, updateTradeStatus } from "@/utils/api";
import styled from "styled-components";

const AdminContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const TradeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background: #333;
  color: white;
  padding: 10px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f2f2f2;
  }
`;

const TableData = styled.td`
  padding: 10px;
  text-align: center;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin: 5px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background: ${(props) => (props.type === "approve" ? "#28a745" : "#dc3545")};
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;

export default function AdminPanel() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    async function loadTrades() {
      const data = await fetchAllTrades();
      setTrades(data);
    }
    loadTrades();
  }, []);

  const handleUpdateStatus = async (tradeId, status) => {
    const result = await updateTradeStatus(tradeId, status);
    if (result) {
      alert(`Trade ${status} successfully!`);
      setTrades(trades.map((t) => (t._id === tradeId ? { ...t, status } : t)));
    } else {
      alert("Failed to update trade status.");
    }
  };

  return (
    <Layout>
      <AdminContainer>
        <Title>Manage Trades</Title>
        <TradeTable>
          <thead>
            <tr>
              <TableHeader>User</TableHeader>
              <TableHeader>Event</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Choice</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {trades.length > 0 ? (
              trades.map((trade) => (
                <TableRow key={trade._id}>
                  <TableData>{trade.user.username}</TableData>
                  <TableData>{trade.event.name}</TableData>
                  <TableData>${trade.amount}</TableData>
                  <TableData>{trade.choice}</TableData>
                  <TableData>{trade.status}</TableData>
                  <TableData>
                    {trade.status === "pending" && (
                      <>
                        <Button type="approve" onClick={() => handleUpdateStatus(trade._id, "won")}>Approve</Button>
                        <Button type="reject" onClick={() => handleUpdateStatus(trade._id, "lost")}>Reject</Button>
                      </>
                    )}
                  </TableData>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableData colSpan="6">No trades available.</TableData>
              </TableRow>
            )}
          </tbody>
        </TradeTable>
      </AdminContainer>
    </Layout>
  );
}
