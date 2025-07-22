const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', HistorySchema);

// Is your schema like this? Include full file
// const mongoose = require('mongoose');

// const HistorySchema = new mongoose.Schema({
//   title: String,
//   action: String,           // <- confirm this exists
//   userId: String,           // <- this MUST be there
//   timestamp: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('History', HistorySchema);
