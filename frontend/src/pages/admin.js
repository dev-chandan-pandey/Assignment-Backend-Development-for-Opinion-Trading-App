
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { baseURL } from "@/utils/api";

const Container = styled.div`
  padding: 10px;
  background: ${(props) => props.theme.colors.background};
  height:92vh;
  overflow:auto;
`;

const TabNav = styled.div`
  display: flex;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  background: ${(props) => (props.active ? "#007bff" : "white")};
  color: ${(props) => (props.active ? "white" : "#007bff")};
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background: #007bff;
    color: white;
  }
`;

const Section = styled.div`
  background: ${(props) => props.theme.colors.cardBackground};
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  width:100%;
  overflow:auto;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;
const Input = styled.input`
  margin-top: 5px;
  padding: 8px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  margin-top: 5px;
  padding: 8px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  margin-top: 10px;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;
const DeleteButton = styled(Button)`
  background: red;
`;
export default function AdminDashboard() {
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("createEvent");
  const [trades, setTrades] = useState([]);
  const [eventData, setEventData] = useState({
    eventId: "",
    name: "",
    sport: "",
    odds: { home: 0, away: 0 },
    startTime: new Date().toISOString().slice(0, 16),
  });


  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch(`${baseURL}api/admin/trades`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTrades(data);
        } else {
          setTrades([]);
        }
      }).catch((error) => {
        console.error("Error fetching trades:", error);
        setTrades([]);
      });;
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const token = localStorage.getItem("token");
      console.log("eventData", eventData)
      const formattedEventData = {
        ...eventData,
        startTime: new Date(eventData.startTime).toISOString(),
      };
      setError('')
      const response = await fetch(`${baseURL}api/admin/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedEventData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Event created successfully!");
        setEventData({
          eventId: "",
          name: "",
          sport: "",
          odds: { home: "", away: "" },
          startTime: new Date().toISOString().slice(0, 16),
        });
      } else {
        setError(`Failed to create event: ${data.error}`)
        setEventData({
          eventId: "",
          name: "",
          sport: "",
          odds: { home: "", away: "" },
          startTime: new Date().toISOString().slice(0, 16),
        });
      }
    } catch (error) {
      console.error("Error creating event:", error.message);
      setError(`Failed to create event: ${data.error}`)
    }
  };

  const updateTradeStatus = async (id, status) => {
    console.log("status", status)
    try {
      const token = localStorage.getItem("token");
      setError('')
      const response = await fetch(`${baseURL}api/admin/trades/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      console.log("response", response)
      if (response.ok) {
        alert("Event Updated successfully!");
        setTrades((prevTrades) =>
          prevTrades.map((trade) => (trade._id === id ? { ...trade, status } : trade))
        );
      } else {
        setError(`Failed to create event: ${data.error} or Failed to update trade.`)
      }
    } catch (error) {
      console.log(error)
      setError(`Failed to upadate trade: ${error.message}`)
    }

  };

  const deleteTrade = async (id) => {
    const token = localStorage.getItem("token");
    setError('')
    const response = await fetch(`${baseURL}api/admin/trades/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      setTrades((prevTrades) => prevTrades.filter((trade) => trade._id !== id));
    } else {
      setError("Failed to delete trade.")
    }
  };
  return (
    <Layout>
      <Container>
        <h1>Admin Panel</h1>

        {/* Tab Navigation */}
        <TabNav>
          <TabButton active={activeTab === "createEvent"} onClick={() => {
            setActiveTab("createEvent")
            setError('')
          }}>
            Create Event
          </TabButton>
          <TabButton active={activeTab === "manageTrades"} onClick={() => {
            setActiveTab("manageTrades")
            setError('')
          }}>
            Manage Trades
          </TabButton>
        </TabNav>

        {/* Tab Content */}
        {activeTab === "createEvent" && (
          <Section>
            <h2>Create Event</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Form onSubmit={handleCreateEvent}>
              <Input type="text" placeholder="Event ID" value={eventData.eventId} onChange={(e) => setEventData({ ...eventData, eventId: e.target.value })} />
              <Input type="text" placeholder="Event Name" value={eventData.name} onChange={(e) => setEventData({ ...eventData, name: e.target.value })} />
              <Input type="text" placeholder="Sport" value={eventData.sport} onChange={(e) => setEventData({ ...eventData, sport: e.target.value })} />
              <Input
                type="number"
                placeholder="Home Odds"
                value={eventData.odds.home}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    odds: { ...eventData.odds, home: parseFloat(e.target.value) || 0 },
                  })
                }
              />
              <Input
                type="number"
                placeholder="Away Odds"
                value={eventData.odds.away}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    odds: { ...eventData.odds, away: parseFloat(e.target.value) || 0 },
                  })
                }
              />

              <Input
                type="datetime-local"
                value={eventData.startTime}
                onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })}
              />
              <Button type="submit">Create Event</Button>
            </Form>
          </Section>
        )}

        {activeTab === "manageTrades" && (
          <Section>
            <h2>Manage Trades</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {trades.length === 0 ? (
              <p>No trades available</p>
            ) : (
              Array.isArray(trades) && trades.length > 0 && trades?.map((trade) => (
                <div key={trade._id} style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                  <p>User: {trade.user ? trade.user.username : "Unknown User"}</p>
                  <p>Event: {trade.event || "No Event"}</p>
                  <p>Amount: ${trade.amount || 0}</p>
                  <p>Choice: {trade.choice || "N/A"}</p>
                  <p>Status: {trade.status || "Pending"}</p>
                  <Select onChange={(e) => updateTradeStatus(trade._id, e.target.value)}>
                    <option disabled selected>select status</option>
                    <option value="pending">Pending</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </Select>
                  <DeleteButton onClick={() => deleteTrade(trade._id)}>
                    Delete Trade
                  </DeleteButton>
                </div>
              ))
            )}
          </Section>
        )}
      </Container>
    </Layout>
  );
}
