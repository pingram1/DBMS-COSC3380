const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const jwt = require('jsonwebtoken');

// Admin (Employee) Login
router.post('/admin/login', async (req, res) => {
    try {
        const { firstName, lastName, employeeId } = req.body;
        
        const [employees] = await pool.query(
            'SELECT * FROM employee WHERE Employee_ID = ? AND First_Name = ? AND Last_Name = ?',
            [employeeId, firstName, lastName]
        );

        if (employees.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const employee = employees[0];
        
        // Create JWT token
        const token = jwt.sign(
            { 
                id: employee.Employee_ID,
                firstName: employee.First_Name,
                lastName: employee.Last_Name,
                role: 'admin'
            },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({ 
            token,
            user: {
                id: employee.Employee_ID,
                firstName: employee.First_Name,
                lastName: employee.Last_Name,
                role: 'admin'
            }
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ error: 'Server error during admin login' });
    }
});

// Customer Login
router.post('/customer/login', async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        
        const [customers] = await pool.query(
            'SELECT * FROM customer WHERE Phone_Number = ?',
            [phoneNumber]
        );

        if (customers.length === 0) {
            return res.status(401).json({ error: 'Invalid phone number' });
        }

        const customer = customers[0];

        // Create JWT token
        const token = jwt.sign(
            { 
                id: customer.Customer_ID,
                phoneNumber: customer.Phone_Number,
                membershipLevel: customer.Membership_Level,
                role: 'customer'
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ 
            token,
            user: {
                id: customer.Customer_ID,
                phoneNumber: customer.Phone_Number,
                membershipLevel: customer.Membership_Level,
                role: 'customer'
            }
        });

    } catch (error) {
        console.error('Customer login error:', error);
        res.status(500).json({ error: 'Server error during customer login' });
    }
});

module.exports = router;