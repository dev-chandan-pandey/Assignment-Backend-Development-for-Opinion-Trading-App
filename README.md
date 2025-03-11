# Assignment-Backend-Development-for-Opinion-Trading-App


import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Update with backend URL when deployed

const LiveEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    socket.on('liveEvents', (data) => {
      setEvents(data);
    });

    return () => {
      socket.off('liveEvents'); // Cleanup on unmount
    };
  }, []);

  return (
    <div>
      <h2>Live Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.eventId}>{event.name} - {event.odds.home} / {event.odds.away}</li>
        ))}
      </ul>
    </div>
  );
};

export default LiveEvents;
