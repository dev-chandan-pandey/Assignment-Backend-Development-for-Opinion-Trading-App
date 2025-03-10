const Trade = require('../models/Trade');
const Event = require('../models/Event');

exports.placeTrade = async (req, res) => {
  try {
    const { eventId, amount, choice } = req.body;
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const trade = await Trade.create({
      user: req.user.userId,
      event: eventId,
      amount,
      choice,
      status: 'pending',
    });

    res.status(201).json(trade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
