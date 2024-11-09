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
}

module.exports = CustomerController;