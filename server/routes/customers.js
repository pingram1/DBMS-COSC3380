const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');
const { authMiddleware } = require('../middlewares/auth');

// Account Management
router.get('/customer/account', authMiddleware, CustomerController.getAccount);
router.get('/customer/orders', authMiddleware, CustomerController.getOrders);
router.put('/customer/account', authMiddleware, CustomerController.updateAccount);

// Orders
router.post('/customer/orders', authMiddleware, CustomerController.placeOrder);  // Regular order
router.post('/guest-orders', CustomerController.placeGuestOrder);      // Guest order

// Registration
router.post('/customer/register', CustomerController.register);

module.exports = router;