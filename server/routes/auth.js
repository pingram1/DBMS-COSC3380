const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const rateLimit = require('express-rate-limit');
const adminLoginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5 // limit each IP to 5 requests per windowMs
});
const customerLoginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100 // limit each IP to 5 requests per windowMs
});

router.post('/admin/login', adminLoginLimiter, AuthController.adminLogin);
router.post('/employee/login', adminLoginLimiter, AuthController.employeeLogin);
router.post('/customer/login', AuthController.customerLogin);

module.exports = router;