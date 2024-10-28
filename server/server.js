const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/db');

// Load environment variables
require('dotenv').config();

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://your-frontend-domain.vercel.app'] // Replace with your frontend domain
      : 'http://localhost:3000',
    credentials: true
  }));
  app.use(express.json());

// Routers
const employeeRouter = require('./routes/employee');
const authRouter = require('./routes/auth');
const itemsRouter = require('./routes/shop');

// Use Routes
app.use('/api/employee', employeeRouter);
app.use('/api/auth', authRouter);
app.use('/api/shop', itemsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something broke!',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Listening to server changes
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

// This is for Vercel deployment
module.exports = app;