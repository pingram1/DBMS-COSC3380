const { pool } = require('../config/db');
const { CUSTOMER_ERRORS } = require('../utils/constants');
const { customerQueries } = require('../models/customerQueries');

class CustomerService {
    static async getCustomerAccount(customerId) {
        try {
            const [customerRows] = await pool.query(
                customerQueries.getCustomerById,
                [customerId]
            );

            if (customerRows.length === 0) {
                throw new Error(CUSTOMER_ERRORS.NOT_FOUND);
            }

            return customerRows[0];
        } catch (error) {
            throw error;
        }
    }

    static async getCustomerOrders(customerId) {
        try {
            const [orders] = await pool.query(
                customerQueries.getCustomerOrders,
                [customerId]
            );

            return orders;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CustomerService;