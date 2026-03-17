const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected to wellnessDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Route Setup
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/appointments', require('./routes/appointRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

// Basic Route for Testing
app.get('/', (req, res) => {
  res.send("AI Mental Wellness API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));