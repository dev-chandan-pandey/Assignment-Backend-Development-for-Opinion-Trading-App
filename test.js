import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const Container = styled.div`
  padding: 20px;
  background: ${(props) => props.theme.colors.background};
  min-height: 100vh;
`;

const EventCard = styled.div`
  background: ${(props) => props.theme.colors.cardBackground};
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: 0.3s ease-in-out;
  &:hover {
    transform: scale(1.02);
  }
`;

const Button = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background: #0056b3;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 300px;
  text-align: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [trades, setTrades] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [amount, setAmount] = useState("");
  const [choice, setChoice] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Fetch live events
    fetch("http://localhost:5000/api/events", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setEvents(data));

    // Fetch all trades (Admin Route)
    fetch("http://localhost:5000/api/admin/trades", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTrades(data));
  }, []);

  const openTradeModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeTradeModal = () => {
    setIsModalOpen(false);
    setAmount("");
  };

  const handleTrade = async () => {
    const token = localStorage.getItem("token");
    if (!selectedEvent || !amount) {
      alert("Please enter an amount.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/trades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        eventId: selectedEvent.eventId,
        amount: Number(amount),
        choice,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Trade placed successfully!");
      setTrades([...trades, data]); // Update trade list
      closeTradeModal();
    } else {
      alert(`Trade failed: ${data.error}`);
    }
  };

  return (
    <Container>
      <h1>Live Events</h1>
      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        events.map((event) => {
          const userTrade = trades.find((t) => t.event === event.eventId);
          return (
            <EventCard key={event.eventId} style={{ border: userTrade ? "2px solid green" : "none" }}>
              <h3>{event.name}</h3>
              <p>Sport: {event.sport}</p>
              <p>Odds: Home {event.odds.home} - Away {event.odds.away}</p>
              {userTrade ? (
                <p style={{ color: "green" }}>You placed a trade on this event!</p>
              ) : (
                <Button onClick={() => openTradeModal(event)}>Place Trade</Button>
              )}
            </EventCard>
          );
        })
      )}

      {isModalOpen && (
        <>
          <Overlay onClick={closeTradeModal} />
          <Modal>
            <h2>Place Trade</h2>
            <p>Event: {selectedEvent?.name}</p>
            <Select onChange={(e) => setChoice(e.target.value)}>
              <option value="home">Home</option>
              <option value="away">Away</option>
            </Select>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button onClick={handleTrade}>Confirm Trade</Button>
            <Button onClick={closeTradeModal} style={{ background: "red" }}>Cancel</Button>
          </Modal>
        </>
      )}
    </Container>
  );
}
<h1>Admin Dashboard</h1>
      {error && <p>{error}</p>}
      <TradeList>
        <h3>Trade List</h3>
        {trades.length > 0 ? (
          trades.map((trade, index) => (
            <div key={index}>
              <p><strong>Event ID:</strong> {trade.eventId}</p>
              <p><strong>Amount:</strong> {trade.amount}</p>
              <p><strong>Choice:</strong> {trade.choice}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>No trades available.</p>
        )}
      </TradeList>
      {/* <Button onClick={handleLogout}>Logout</Button> */}

/api/trades


 display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;