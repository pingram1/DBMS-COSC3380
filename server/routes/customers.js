const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const { authMiddleware } = require('../middlewares/auth');

// Get customer account information
router.get('/customer/account', authMiddleware, async (req, res) => {
    try {
      // Verify user is a customer
      if (req.user.role !== 'customer') {
        console.log('Access denied: User is not a customer');
        return res.status(403).json({ error: 'Access denied' });
      }
  
      // Log the SQL query we're about to execute
      const query = `
        SELECT 	c.Customer_ID, c.Membership_Level, c.Phone_Number, c.Account_Creation_Date, c.Total_Accrued_Discount_Points, c.Discount_Points_Used
        FROM customer c
        WHERE c.Customer_ID = ?
      `;
      console.log('Executing query:', query);
      console.log('With params:', [req.user.id]);
  
      const [customerRows] = await pool.query(query, [req.user.id]);
      console.log('Query result:', customerRows);
  
      if (customerRows.length === 0) {
        console.log('No customer found for ID:', req.user.id);
        return res.status(404).json({ error: 'Customer not found' });
      }

      // Send the response
      res.json(customerRows[0]);
  
    } catch (error) {
      console.error('Detailed error in customer account fetch:', {
        error: error.message,
        stack: error.stack,
        sqlMessage: error.sqlMessage,
        sqlState: error.sqlState,
        code: error.code
      });
      res.status(500).json({ 
        error: 'Error fetching customer account details',
        details: error.message 
      });
    }
  });
  
  module.exports = router;