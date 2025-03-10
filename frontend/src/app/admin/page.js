'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [events, setEvents] = useState([]);
  const [trades, setTrades] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventOdds, setEventOdds] = useState({ home: '', away: '' });

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    // Fetch all events & trades
    axios.get(`${BACKEND_URL}/api/events`).then((res) => setEvents(res.data));
    axios.get(`${BACKEND_URL}/api/admin/trades`, { headers: authHeader() }).then((res) => setTrades(res.data));
  }, []);

  const authHeader = () => {
    return { Authorization: `Bearer ${localStorage.getItem('token')}` };
  };

  const createEvent = async () => {
    if (!eventName || !eventOdds.home || !eventOdds.away) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/api/admin/events`, { name: eventName, odds: eventOdds }, { headers: authHeader() });
      alert('Event created successfully');
      setEventName('');
      setEventOdds({ home: '', away: '' });
    } catch (err) {
      console.error('Error creating event:', err);
      alert('Event creation failed');
    }
  };

  const updateTradeStatus = async (tradeId, status) => {
    try {
      await axios.put(`${BACKEND_URL}/api/admin/trades/${tradeId}`, { status }, { headers: authHeader() });
      alert('Trade updated successfully');
    } catch (err) {
      console.error('Error updating trade:', err);
      alert('Update failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Panel</h1>

      <h2>Create Event</h2>
      <input type="text" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
      <input type="number" placeholder="Home Odds" value={eventOdds.home} onChange={(e) => setEventOdds({ ...eventOdds, home: e.target.value })} />
      <input type="number" placeholder="Away Odds" value={eventOdds.away} onChange={(e) => setEventOdds({ ...eventOdds, away: e.target.value })} />
      <button onClick={createEvent}>Create Event</button>

      <h2>All Trades</h2>
      {trades.length === 0 ? (
        <p>No trades found.</p>
      ) : (
        <ul>
          {trades.map((trade) => (
            <li key={trade._id}>
              Event: {trade.event.name} | Amount: {trade.amount} | Status: {trade.status}
              <button onClick={() => updateTradeStatus(trade._id, 'won')}>Mark as Won</button>
              <button onClick={() => updateTradeStatus(trade._id, 'lost')}>Mark as Lost</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
