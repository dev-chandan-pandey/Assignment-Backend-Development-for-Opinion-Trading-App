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

// exports.updateTrade = async (req, res) => {
//   try {
//     const updatedTrade = await Trade.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedTrade);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.updateTrade = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log("req.body",req.body)
    // Check if the trade exists
    const trade = await Trade.findById(id);
    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }
     
    // if (!['home', 'away', 'draw'].includes(result)) {
    //   return res.status(400).json({ error: 'Invalid result value' });
    // }
    console.log("result",status)
    if (!['pending', 'won', 'lost'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    // Update trade with new data
    const updatedTrade = await Trade.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    res.json(updatedTrade);
  } catch (error) {
    console.error('Error updating trade:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTrade = async (req, res) => {
  try {
    const { id } = req.params;
    const trade = await Trade.findByIdAndDelete(id);

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    res.json({ message: 'Trade deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// const Event = require('../models/Event');

// exports.updateEventResult = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const { result } = req.body;

//     // Validate result
//     if (!['home', 'away', 'draw'].includes(result)) {
//       return res.status(400).json({ error: 'Invalid result value' });
//     }

//     const event = await Event.findOneAndUpdate(
//       { eventId },
//       { result },
//       { new: true }
//     );

//     if (!event) {
//       return res.status(404).json({ error: 'Event not found' });
//     }

//     res.json({ message: 'Event result updated', event });
//   } catch (error) {
//     console.error('Error updating event result:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// };


