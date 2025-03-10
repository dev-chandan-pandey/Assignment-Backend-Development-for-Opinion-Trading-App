// // backend/src/server.js
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const socketIo = require('socket.io');
// const http = require('http');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, { cors: { origin: '*' } });
// const authRoutes = require('./routes/authRoutes');
// const eventRoutes = require('./routes/eventRoutes');
// const { fetchLiveSportsData } = require('./services/sportsDataService');
// // const { fetchLiveSportsData } = require('./services/sportsDataService');
// const adminRoutes = require('./routes/adminRoutes');
// const tradeRoutes = require('./routes/tradeRoutes');
// const { settleTrades } = require('./services/tradeSettlementService');
// const logger = require('./utils/logger');
// const errorHandler = require('./middleware/errorHandler');
// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/api/auth', authRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/trades', tradeRoutes);
// app.use((req, res, next) => {
//     logger.info(`${req.method} ${req.url}`);
//     next();
//   });
// app.use(errorHandler);
// setInterval(fetchLiveSportsData, 60 * 1000); // Fetch every 1 minute
// setInterval(settleTrades, 2 * 60 * 1000);
// io.on('connection', (socket) => {
//   console.log('New WebSocket connection established');

//   // Emit live sports data to clients
//   const sendLiveUpdates = async () => {
//     const events = await Event.find().sort({ startTime: 1 });
//     socket.emit('liveEvents', events);
//   };

//   sendLiveUpdates(); // Send initial data on connection

//   // Fetch new data every 1 minute and push updates
//   const interval = setInterval(async () => {
//     await fetchLiveSportsData(); // Fetch latest data
//     sendLiveUpdates();
//   }, 60 * 1000);

//   // Clean up when the client disconnects
//   socket.on('disconnect', () => {
//     clearInterval(interval);
//     console.log('WebSocket client disconnected');
//   });
// });

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.error(err));

// // WebSocket Connection
// io.on('connection', (socket) => {
//   console.log('New WebSocket connection');
//   socket.on('disconnect', () => {
//     console.log('WebSocket disconnected');
//   });
// });

// // API Routes
// app.get('/', (req, res) => {
//   res.send('Opinion Trading App Backend');
// });

// // Server Listening
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const http = require('http');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const adminRoutes = require('./routes/adminRoutes');
const tradeRoutes = require('./routes/tradeRoutes');

// Import Services
const { fetchLiveSportsData } = require('./services/sportsDataService');
const { settleTrades } = require('./services/tradeSettlementService');

// Import Models
const Event = require('./models/Event');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/trades', tradeRoutes);
app.get('/', (req, res) => {
    res.send('Opinion Trading App Backend');
});

// Scheduled Tasks
setInterval(fetchLiveSportsData, 60 * 1000); // Fetch sports data every 1 minute
setInterval(settleTrades, 2 * 60 * 1000); // Settle trades every 2 minutes

// WebSocket Logic
const clientIntervals = {};

io.on('connection', (socket) => {
    console.log('New WebSocket connection established');

    // Function to send live sports updates
    const sendLiveUpdates = async () => {
        try {
            const events = await Event.find().sort({ startTime: 1 });
            socket.emit('liveEvents', events);
        } catch (error) {
            console.error('Error fetching live events:', error);
        }
    };

    sendLiveUpdates(); // Send initial data on connection

    // Set up interval for live updates
    clientIntervals[socket.id] = setInterval(async () => {
        await fetchLiveSportsData();
        sendLiveUpdates();
    }, 60 * 1000);

    // Handle client disconnect
    socket.on('disconnect', () => {
        clearInterval(clientIntervals[socket.id]);
        delete clientIntervals[socket.id];
        console.log('WebSocket client disconnected');
    });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Handle MongoDB Disconnection
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB Error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB Disconnected. Attempting to reconnect...');
});

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
