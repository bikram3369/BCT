const History = require('../models/History'); // ✅ Correct lowercase path

// GET /api/history
exports.getHistory = async (req, res) => {
  try {
    const rawHistory = await History.find({ userId: req.user.userId }).sort({ timestamp: -1 });

    const formattedHistory = rawHistory.map((item) => {
      const dateObj = new Date(item.timestamp);
      return {
        _id: item._id,
        title: item.title,
        completed: item.action === 'completed',
        date: dateObj.toLocaleDateString(),
        time: dateObj.toLocaleTimeString(),
      };
    });

    res.json(formattedHistory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/history
exports.clearHistory = async (req, res) => {
  try {
    await History.deleteMany({ userId: req.user.userId });
    res.json({ message: '✅ History cleared successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
