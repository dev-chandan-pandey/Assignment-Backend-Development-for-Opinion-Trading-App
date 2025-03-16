const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  event: { type: String, required: true }, // Store eventId as a string, NOT ObjectId
  amount: { type: Number, required: true },
  choice: { type: String, required: true },
  status: { type: String, enum: ['pending', 'won', 'lost'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Trade', TradeSchema);
