const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// Load environment variables
require('dotenv').config();

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://your-frontend-domain.vercel.app'] 
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

// Health check endpoint & testing
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Listening to server changes
if (process.env.NODE_ENV === 'production') {
    // Serve static files if you have them
    if (process.env.SERVE_STATIC === 'true') {
      app.use(express.static('public'));
    
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
      });
    }
  }
  
  // Server startup
  const PORT = process.env.PORT || 5000;
  if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
  
  module.exports = app;