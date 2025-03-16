// const Trade = require('../models/Trade');
// const Event = require('../models/Event');

// const settleTrades = async () => {
//   try {
//     const events = await Event.find(); 

//     for (const event of events) {
//       const trades = await Trade.find({ event: event._id, status: 'pending' });

//       for (const trade of trades) {
//         const outcome = event.odds.result; // Assume this is updated from live API

//         trade.status = trade.choice === outcome ? 'won' : 'lost';
//         await trade.save();
//       }
//     }

//     console.log('Trades settled successfully.');
//   } catch (error) {
//     console.error('Error settling trades:', error.message);
//   }
// };

// // Run every 2 minutes
// setInterval(settleTrades, 2 * 60 * 1000);

// module.exports = { settleTrades };
// const Trade = require('../models/Trade');
// const Event = require('../models/Event');

// const settleTrades = async () => {
//   try {
//     // Find completed events with a result
//     const completedEvents = await Event.find({ result: { $ne: null } });

//     for (const event of completedEvents) {
//       // Find all pending trades for this event
//       const trades = await Trade.find({ event: event.eventId, status: 'pending' });

//       for (const trade of trades) {
//         // Update trade status based on event result
//         trade.status = trade.choice === event.result ? 'won' : 'lost';
//         await trade.save();
//       }
//     }

//     console.log('Trades settled successfully.');
//   } catch (error) {
//     console.error('Error settling trades:', error.message);
//   }
// };

// // Run every 2 minutes
// setInterval(settleTrades, 2 * 60 * 1000);

// module.exports = { settleTrades };
const Trade = require('../models/Trade');
const Event = require('../models/Event');
const { io, broadcastUpdates } = require('../server');

const settleTrades = async () => {
  try {
    const completedEvents = await Event.find({ result: { $ne: null } });

    for (const event of completedEvents) {
      const trades = await Trade.find({ event: event.eventId, status: 'pending' });

      for (const trade of trades) {
        trade.status = trade.choice === event.result ? 'won' : 'lost';
        await trade.save();
      }
    }

    console.log('Trades settled successfully.');
    
    // Push real-time updates
    broadcastUpdates();
  } catch (error) {
    console.error('Error settling trades:', error.message);
  }
};
