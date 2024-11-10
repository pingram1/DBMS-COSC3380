const { transactionQueries } = require('../models/transactionQueries');
const CustomerService = require('../services/customerService');
const { CUSTOMER_ERRORS } = require('../utils/constants');

class CustomerController {
    static async getAccount(req, res) {
        try {
            if (req.user.role !== 'customer') {
                throw new Error(CUSTOMER_ERRORS.INVALID_ROLE);
            }

            const customerData = await CustomerService.getCustomerAccount(req.user.id);
            res.json(customerData);
        } catch (error) {
            console.error('Controller - getAccount error:', error);
            
            if (error.message === CUSTOMER_ERRORS.NOT_FOUND) {
                res.status(404);
            } else if (error.message === CUSTOMER_ERRORS.INVALID_ROLE) {
                res.status(403);
            } else {
                res.status(500);
            }
            
            res.json({ error: error.message });
        }
    }

    static async getOrders(req, res) {
        try {
            if (req.user.role !== 'customer') {
                throw new Error(CUSTOMER_ERRORS.INVALID_ROLE);
            }

            const orders = await CustomerService.getCustomerOrders(req.user.id);
            res.json(orders);
        } catch (error) {
            console.error('Controller - getOrders error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async register(req, res) {
        try {
            const { 
                firstName, 
                lastName, 
                phoneNumber, 
                dateOfBirth, 
                address 
            } = req.body;

            // Validate required fields
            if (!firstName || !lastName || !phoneNumber || !dateOfBirth || !address) {
                return res.status(400).json({ 
                    error: CUSTOMER_ERRORS.INVALID_INPUT 
                });
            }

            const customerData = await CustomerService.registerCustomer({
                firstName,
                lastName,
                phoneNumber,
                dateOfBirth,
                address
            });

            res.status(201).json({
                message: 'Registration successful',
                customer: customerData
            });

        } catch (error) {
            console.error('Controller - register error:', error);
            
            let statusCode = 500;
            let errorMessage = 'Internal server error';

            if (error.message === CUSTOMER_ERRORS.ALREADY_EXISTS) {
                statusCode = 409;
                errorMessage = 'Phone number already registered';
            } else if (error.message === CUSTOMER_ERRORS.INVALID_INPUT) {
                statusCode = 400;
                errorMessage = 'Missing required fields';
            }

            res.status(statusCode).json({ error: errorMessage });
        }
    }
    
    static async placeOrder(req, res) {
        try {
            if (req.user.role !== 'customer') {
                throw new Error(CUSTOMER_ERRORS.INVALID_ROLE);
            }

            const { items, total } = req.body;
            if (!items?.length || !total) {
                throw new Error(CUSTOMER_ERRORS.INVALID_ORDER);
            }

            const orderResult = await CustomerService.placeOrder(req.user.id, {
                items,
                total
            });

            res.status(201).json({
                message: 'Order placed successfully',
                ...orderResult
            });
        } catch (error) {
            console.error('Controller - placeOrder error:', error);

            if (error.message === CUSTOMER_ERRORS.INVALID_ROLE) {
                res.status(403);
            } else if (error.message === CUSTOMER_ERRORS.INVALID_ORDER) {
                res.status(400);
            } else {
                res.status(500);
            }

            res.json({ error: error.message });
        }
    }

    static async placeGuestOrder(req, res) {
        try {
            const { items, total, customerInfo } = req.body;

            if (!items?.length || !total || !customerInfo) {
                throw new Error(CUSTOMER_ERRORS.INVALID_ORDER);
            }

            if (!customerInfo.name || !customerInfo.phoneNumber || !customerInfo.address) {
                throw new Error(CUSTOMER_ERRORS.INVALID_GUEST_INFO);
            }

            const orderResult = await CustomerService.placeGuestOrder({
                items,
                total,
                customerInfo
            });

            res.status(201).json({
                message: 'Guest order placed successfully',
                ...orderResult
            });
        } catch (error) {
            console.error('Controller - placeGuestOrder error:', error);

            if (error.message === CUSTOMER_ERRORS.INVALID_ORDER) {
                res.status(400);
            } else if (error.message === CUSTOMER_ERRORS.INVALID_GUEST_INFO) {
                res.status(400);
            } else {
                res.status(500);
            }

            res.json({ error: error.message });
        }
    }

    static async updateAccount(req, res) {
        try {
            if (req.user.role !== 'customer') {
                throw new Error(CUSTOMER_ERRORS.INVALID_ROLE);
            }

            const { address } = req.body;
            if (!address) {
                throw new Error(CUSTOMER_ERRORS.INVALID_INPUT);
            }

            const customerData = await CustomerService.updateAccount(req.user.id, {
                address
            });

            res.json(customerData);
        } catch (error) {
            console.error('Controller - updateAccount error:', error);
            
            if (error.message === CUSTOMER_ERRORS.INVALID_ROLE) {
                res.status(403);
            } else if (error.message === CUSTOMER_ERRORS.INVALID_INPUT) {
                res.status(400);
            } else {
                res.status(500);
            }
            
            res.json({ error: error.message });
        }
    }
}

module.exports = CustomerController;