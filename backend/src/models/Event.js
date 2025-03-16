const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  sport: { type: String, required: true },
  odds: { type: Object, required: true },
  startTime: { type: Date, required: true },
  result: { type: String, enum: ['home', 'away', 'draw'], default: null }, // Store event outcome
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
