const Event = require('../models/Event');
const Trade = require('../models/Trade');

exports.createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrades = async (req, res) => {
  try {
    const trades = await Trade.find().populate('user event');
    res.json(trades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTrade = async (req, res) => {
  try {
    const updatedTrade = await Trade.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTrade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
