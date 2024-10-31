const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

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