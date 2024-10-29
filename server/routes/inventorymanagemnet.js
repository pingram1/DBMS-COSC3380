const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// Get specific food item details by ID
router.get('/all-flavors/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM food_item WHERE Item_ID = ?',
            [req.params.id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }
        
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching food item details:', error);
        res.status(500).json({ error: 'Error fetching food item details' });
    }
});

module.exports = router;