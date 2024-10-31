const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.post('/admin/login', AuthController.adminLogin);
router.post('/customer/login', AuthController.customerLogin);

module.exports = router;