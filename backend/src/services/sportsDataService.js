// const axios = require('axios');
// const Event = require('../models/Event');

// const fetchLiveSportsData = async () => {
//   try {
//     // Replace with real API endpoint if available
//     const response = await axios.get('https://api.mock-sports.com/events');
//     const events = response.data;

//     // Store events in MongoDB (upsert to avoid duplicates)
//     for (const event of events) {
//       await Event.findOneAndUpdate(
//         { eventId: event.id },
//         { ...event },
//         { upsert: true, new: true }
//       );
//     }
    
//     console.log('Live sports data updated.');
//   } catch (error) {
//     console.error('Error fetching sports data:', error.message);
//   }
// };

// module.exports = { fetchLiveSportsData };


const Event = require('../models/Event');

const fetchLiveSportsData = async () => {
  try {
    // Fetch events from MongoDB (since we manually inserted them)
    const events = await Event.find().sort({ startTime: 1 });

    if (!events.length) {
      console.warn('No events found in database.');
      return [];
    }

    console.log('Fetched events from MongoDB:', events);
    return events;
  } catch (error) {
    console.error('Error fetching events from database:', error.message);
    return [];
  }
};

module.exports = { fetchLiveSportsData };

