const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getHistory, clearHistory } = require('../controllers/historyController');

const router = express.Router();

// 🔐 Protect all history routes
router.use(authMiddleware);

// 🧾 Get user's task history
router.get('/', getHistory);

// 🧹 Clear user's task history
router.delete('/clear', clearHistory);

module.exports = router;
