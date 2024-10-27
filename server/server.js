const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/db');

// Load environment variables
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());

// Routers
const employeeRouter = require('./routes/employee');
const authRouter = require('./routes/auth');
const itemsRouter = require('./routes/shop');

// Use Routes
app.use('/employee', employeeRouter);
app.use('/auth', authRouter);
app.use('/shop', itemsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something broke!',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Listening to server changes
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});