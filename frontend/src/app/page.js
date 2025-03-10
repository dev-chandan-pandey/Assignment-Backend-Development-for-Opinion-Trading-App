'use client';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'); // Change for production

export default function LiveEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch initial data from backend
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`)
      .then((response) => setEvents(response.data))
      .catch((error) => console.error('Error fetching events:', error));

    // Listen for live updates via WebSocket
    socket.on('liveEvents', (data) => {
      setEvents(data);
    });

    return () => {
      socket.off('liveEvents'); // Cleanup on unmount
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Live Sports Events</h1>
      {events.length === 0 ? (
        <p>Loading events...</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.eventId}>
              {event.name} - Odds: {event.odds.home} / {event.odds.away}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
