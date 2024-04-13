const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const collegeRoutes = require('./routes/api/collegeRoutes');
const studentRoutes = require('./routes/api/studentRoutes');
const paymentRoutes = require('./routes/api/paymentRoutes');
const cors = require('cors');
const subscriptionRoutes  = require('./routes/api/subscriptionRoutes');
const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: `${process.env.FRONTEND_URL}`,
    // Other CORS options if needed
  };
// MongoDB connection
mongoose.connect(process.env.DB_URL, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));
app.use(cors(corsOptions));
// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use('/api', collegeRoutes);
app.use('/api', studentRoutes);
app.use('/api', subscriptionRoutes);
app.use('/api', paymentRoutes);

// Start server
app.listen(port, () => console.log(`Server listening on port ${port}`));