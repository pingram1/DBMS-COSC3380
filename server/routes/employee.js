const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// // Test connection endpoint
// router.get('/test', async (req, res) => {
//     try {
//         const [result] = await pool.query('SELECT 1');
//         res.json({ 
//             message: 'Database connection successful',
//             result 
//         });
//     } catch (error) {
//         console.error('Database test failed:', error);
//         res.status(500).json({ 
//             error: 'Database test failed',
//             details: error.message
//         });
//     }
// });

// Get all employees
router.get('/', async (req, res) => {
    try {
        // console.log('Attempting to fetch employees...');
        const [rows] = await pool.query(`
            SELECT *
            FROM employee
        `);
        // console.log('Successfully fetched employees:', rows.length);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching employees:', {
            message: error.message,
            code: error.code,
            state: error.sqlState,
            sqlMessage: error.sqlMessage
        });
        res.status(500).json({ 
            error: 'Error fetching employees',
            details: error.message,
            code: error.code
        });
    }
});

module.exports = router;