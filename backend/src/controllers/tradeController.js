const Trade = require('../models/Trade');
const Event = require('../models/Event');
const mongoose = require('mongoose');
// exports.placeTrade = async (req, res) => {
//   try {
//     const { eventId, amount, choice } = req.body;
//     const event = await Event.findById(eventId);
    
//     // if (!event) {
//     //   return res.status(404).json({ error: 'Event not found' });
//     // }

//     const trade = await Trade.create({
//       user: req.user.userId,
//       event: eventId,
//       amount,
//       choice,
//       status: 'pending',
//     });

//     res.status(201).json(trade);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



// exports.placeTrade = async (req, res) => {
//   try {
//     console.log('User Data:', req.user);
//     console.log('Received Trade Data:', req.body);

//     const { eventId, amount, choice } = req.body;

//     // if (!amount || amount <= 0) {
//     //   return res.status(400).json({ error: 'Invalid amount' });
//     // }

//     // if (!['teamA', 'teamB'].includes(choice)) {
//     //   return res.status(400).json({ error: 'Invalid choice' });
//     // }
//     if (!mongoose.Types.ObjectId.isValid(eventId)) {
//       return res.status(400).json({ error: 'Invalid event ID format' });
//     }
//     const event = await Event.findById({eventId});
//     if (!event) {
//       return res.status(404).json({ error: 'Event not found' });
//     }

//     const trade = await Trade.create({
//       user: req.user.userId || req.user.id, // Ensure correct user ID
//       event: eventId,
//       amount,
//       choice,
//       status: 'pending',
//     });

//     res.status(201).json(trade);
//   } catch (error) {
//     console.error('Trade Creation Error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };
// const Trade = require('../models/Trade');
// const Event = require('../models/Event');

// exports.placeTrade = async (req, res) => {
//   try {
//     const { eventId, amount, choice } = req.body;
    
//     // Validate event
//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ error: 'Event not found' });
//     }

//     // Create trade
//     const trade = await Trade.create({
//       user: req.user.userId,
//       event: eventId,
//       amount,
//       choice,
//       status: 'pending',
//     });

//     res.status(201).json(trade);
//   } catch (error) {
//     console.error('Error placing trade:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// const Trade = require('../models/Trade');
// const Event = require('../models/Event');

exports.placeTrade = async (req, res) => {
  try {
    const { eventId, amount, choice } = req.body;

    // Find event using eventId as a string
    const event = await Event.findOne({ eventId });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
     // Check if the user already placed the same trade
     const existingTrade = await Trade.findOne({
      user: req.user.userId,
      event: eventId,
      choice,
    });

    if (existingTrade) {
      return res.status(400).json({ error: 'You have already placed this trade.' });
    }
    // Create the trade (store eventId as a string)
    const trade = await Trade.create({
      user: req.user.userId,
      event: eventId,
      amount,
      choice,
      status: 'pending',
    });

    res.status(201).json(trade);
  } catch (error) {
    console.error('Error placing trade:', error.message);
    res.status(500).json({ error: error.message });
  }
};

