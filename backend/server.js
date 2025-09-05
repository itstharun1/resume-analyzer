require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for your specific frontend URL
app.use(cors({
  origin: 'https://resume-analyzer-ai-pro.netlify.app', // only allow this URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/resumes', resumeRoutes);

// Start server
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Startup failed:', err);
  });
