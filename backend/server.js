require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://resume-analyzer-project.netlify.app/'],
}));


app.use('/api/resumes', resumeRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}).catch(err => {
  console.error('Startup failed:', err);
});
