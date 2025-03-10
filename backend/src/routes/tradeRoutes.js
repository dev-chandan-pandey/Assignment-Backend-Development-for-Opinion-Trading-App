const express = require('express');
const { placeTrade } = require('../controllers/tradeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, placeTrade);

module.exports = router;
