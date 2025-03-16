const express = require('express');
const { createEvent, getTrades, updateTrade, deleteTrade } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/events', authMiddleware, adminMiddleware, createEvent);
router.get('/trades', authMiddleware, adminMiddleware, getTrades);
router.put('/trades/:id', authMiddleware, adminMiddleware, updateTrade);
router.delete('/trades/:id', authMiddleware, adminMiddleware, deleteTrade);
module.exports = router;
