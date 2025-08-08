const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  action: { type: String, enum: ['completed', 'deleted'], required: true },
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
