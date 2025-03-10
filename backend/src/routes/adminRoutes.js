const express = require('express');
const { createEvent, getTrades, updateTrade } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/events', authMiddleware, adminMiddleware, createEvent);
router.get('/trades', authMiddleware, adminMiddleware, getTrades);
router.put('/trades/:id', authMiddleware, adminMiddleware, updateTrade);

module.exports = router;
