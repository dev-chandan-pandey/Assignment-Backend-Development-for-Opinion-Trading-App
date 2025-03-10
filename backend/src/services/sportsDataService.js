const axios = require('axios');
const Event = require('../models/Event');

const fetchLiveSportsData = async () => {
  try {
    // Replace with real API endpoint if available
    const response = await axios.get('https://api.mock-sports.com/events');
    const events = response.data;

    // Store events in MongoDB (upsert to avoid duplicates)
    for (const event of events) {
      await Event.findOneAndUpdate(
        { eventId: event.id },
        { ...event },
        { upsert: true, new: true }
      );
    }
    
    console.log('Live sports data updated.');
  } catch (error) {
    console.error('Error fetching sports data:', error.message);
  }
};

module.exports = { fetchLiveSportsData };
