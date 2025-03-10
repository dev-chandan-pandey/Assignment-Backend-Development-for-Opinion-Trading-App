const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  sport: { type: String, required: true },
  odds: { type: Object, required: true },
  startTime: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
