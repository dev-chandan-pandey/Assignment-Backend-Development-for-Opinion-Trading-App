'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [trades, setTrades] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [amount, setAmount] = useState('');

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    // Fetch user trades
    axios.get(`${BACKEND_URL}/api/trades`, { headers: authHeader() })
      .then((res) => setTrades(res.data))
      .catch((err) => console.error('Error fetching trades:', err));

    // Fetch live events
    axios.get(`${BACKEND_URL}/api/events`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error('Error fetching events:', err));
  }, []);

  const authHeader = () => {
    return { Authorization: `Bearer ${localStorage.getItem('token')}` };
  };

  const placeTrade = async () => {
    if (!selectedEvent || !amount) {
      alert('Please select an event and enter an amount');
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/api/trades`, { eventId: selectedEvent, amount }, { headers: authHeader() });
      alert('Trade placed successfully');
      setAmount('');
    } catch (err) {
      console.error('Error placing trade:', err);
      alert('Trade failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Dashboard</h1>

      <h2>Place a Trade</h2>
      <select onChange={(e) => setSelectedEvent(e.target.value)} value={selectedEvent}>
        <option value="">Select an Event</option>
        {events.map((event) => (
          <option key={event.eventId} value={event.eventId}>
            {event.name} - Odds: {event.odds.home} / {event.odds.away}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={placeTrade}>Place Trade</button>

      <h2>My Trades</h2>
      {trades.length === 0 ? (
        <p>No trades placed yet.</p>
      ) : (
        <ul>
          {trades.map((trade) => (
            <li key={trade._id}>
              Event: {trade.event.name} | Amount: {trade.amount} | Status: {trade.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
