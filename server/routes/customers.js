const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');
const { authMiddleware } = require('../middlewares/auth');

router.get('/customer/account', authMiddleware, CustomerController.getAccount);
router.get('/customer/orders', authMiddleware, CustomerController.getOrders);
//TODO: implements more stuff

module.exports = router;