const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const historyRoutes = require('./routes/historyRoutes'); // ✅ NEW

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('✅ Task Manager API is running...');
});

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/history', historyRoutes); // ✅ MOUNT HISTORY ROUTE

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
