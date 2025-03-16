
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "@/components/Layout";

const Container = styled.div`
margin:0px;
padding:0PX;
background: ${(props) => props.theme.colors.background};
  overflow: auto;
  height:92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TradeList = styled.div`
  width: 80%;
  max-width: 600px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  height:300px;
   overflow: auto;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px;
  background: red;
  color: white;
  border: none;
  cursor: pointer;
`;
const EventList = styled.div`
  width: 95%;
  background: white;
  padding:20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  height:75vh;
   overflow: auto;
    width: 95%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  overflow: auto;
`;
const EventCard = styled.div`
  margin:0px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  background: ${(props) => props.theme.colors.cardBackground};
  padding: 20px;
  border-radius: 8px;
`;
const Select = styled.select`
  margin-top: 5px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Input = styled.input`
  margin-top: 5px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 10px; /* Stick it at the top */
  background: ${(props) => props.theme.colors.background};
  padding: 10px;
  z-index: 10;
`;

const TradeButton = styled.button`
  padding: 12px 20px;
  background: red;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.2s;

  &:hover {
    background: darkred;
  }
`;

// export default function Dashboard() {
//   const router = useRouter();
//   const [trades, setTrades] = useState([]);
//   const [error, setError] = useState("");
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [choice, setChoice] = useState("home");
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log(token,'token');
//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     const fetchTrades = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/admin/trades", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // if (!response.ok) throw new Error("Failed to fetch trades");

//         const data = await response.json();
//         console.log(data,"data")
//         setTrades(data);
//       } catch (err) {
//         setError("Error loading trades.");
//       }
//     };

//     fetchTrades();
//     fetch("http://localhost:5000/api/events", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) => setEvents(data));

//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     router.push("/login");
//   };
//   const handleTrade = async () => {
//     const token = localStorage.getItem("token");
//     if (!selectedEvent || !amount) {
//       alert("Please select an event and enter an amount.");
//       return;
//     }

//     const response = await fetch("http://localhost:5000/api/trades", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         eventId: selectedEvent,
//         amount: Number(amount),
//         choice,
//       }),
//     });

//     const data = await response.json();
//     console.log("response",response)
//     if (response.ok) {
//       alert("Trade placed successfully!");
//       setAmount(""); // Clear input after placing trade
//     } else {
//       alert(`Trade failed: ${data.error}`);
//     }
//   };
//   return (
//     <Layout>
//  <Container>

//  <h1>Live Events</h1>
//  <ButtonContainer>
//     {selectedEvent && <TradeButton onClick={handleTrade}>Place Trade</TradeButton>}
//   </ButtonContainer>
//    <EventList>
//    {events.length === 0 ? <p>No events available</p> : events.map((event) => (
//         <EventCard key={event.eventId}>
//           <h3>{event.name}</h3>
//             <p>Sport: {event.sport}</p>
//             <p>Odds: Home {event.odds.home} - Away {event.odds.away}</p>
//             <Select onChange={(e) => setChoice(e.target.value)}>
//               <option value="home">Home</option>
//               <option value="away">Away</option>
//             </Select>
//             <Input
//               type="number"
//               placeholder="Enter amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />
//             <Button onClick={() => setSelectedEvent(event.eventId)}>
//               Select Event
//             </Button>
//         </EventCard>
//       ))}
      
//    </EventList>
//     {/* <Button onClick={handleLogout}>Logout</Button> */}
//     </Container>
//     </Layout>
   
//   );
// }


export default function Dashboard() {
  const router = useRouter();
  const [trades, setTrades] = useState([]);
  const [error, setError] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [amounts, setAmounts] = useState({}); // Store amount per event
  const [choice, setChoice] = useState("home");

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          setError("Failed to fetch events");
          // throw new Error("Failed to fetch events");
          return
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
      }
    };

    fetchEvents();
  }, []);

  const handleTrade = async () => {
    if (!selectedEvent || !amounts[selectedEvent]) {
      alert("Please select an event and enter an amount.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/trades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId: selectedEvent,
          amount: Number(amounts[selectedEvent]),
          choice,
        }),
      });
      setError('');
      const data = await response.json();

      if (!response.ok) {
        // throw new Error(data.error || "Trade placement failed");
        setError(data.error || "Trade placement failed");
        return
      }

      alert("Trade placed successfully!");
      setAmounts((prev) => ({ ...prev, [selectedEvent]: "" })); // Clear input
    } catch (err) {
      console.error("Trade error:", err);
      alert(`Trade failed: ${err.message}`);
      setError(`Trade failed: ${err.message}`);
    }
  };

  return (
    <Layout>
      <Container>
        <h1>Live Events</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
      
    <ButtonContainer>
    {selectedEvent && <TradeButton onClick={handleTrade}>Place Trade</TradeButton>}
  </ButtonContainer>
        <EventList>
          {events.length === 0 ? (
            <p>No events available</p>
          ) : (
            events.map((event) => (
              <EventCard key={event.eventId}>
                <div>
                  <input
                    type="radio"
                    name="selectedEvent"
                    value={event.eventId}
                    checked={selectedEvent === event.eventId}
                    onChange={() =>{ setSelectedEvent(event.eventId)
                      setError('')
                    }}
                  />
                  <strong>{event.name}</strong>
                </div>
                <p>Sport: {event.sport}</p>
                <p>Odds: Home {event.odds.home} - Away {event.odds.away}</p>
                <Select onChange={(e) => setChoice(e.target.value)}>
                  <option value="home">Home</option>
                  <option value="away">Away</option>
                </Select>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amounts[event.eventId] || ""}
                  onChange={(e) =>
                    setAmounts((prev) => ({
                      ...prev,
                      [event.eventId]: e.target.value,
                    }))
                  }
                  disabled={selectedEvent !== event.eventId} // Disable input for unselected events
                />
              </EventCard>
            ))
          )}
        </EventList>
      </Container>
    </Layout>
  );
}
