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

            const customerData = customerRows[0];
            const membershipDetails = this.getMembershipDetails(customerData.Membership_Level);

            return {
                ...customerData,
                ...membershipDetails
            };
        } catch (error) {
            console.error('Service - getCustomerAccount error:', error);
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
            console.error('Service - getCustomerOrders error:', error);
            throw error;
        }
    }

    static getMembershipDetails(level) {
        const benefits = {
            Bronze: {
                discounts: [],
                pointsRate: 1,
                benefits: ["Earn 1 point per dollar spent"]
            },
            Silver: {
                discounts: ['5% off on orders of 4+ items'],
                pointsRate: 1.2,
                benefits: [
                    "Earn 1.2 points per dollar spent",
                    "5% discount on orders of 4+ items"
                ]
            },
            Gold: {
                discounts: ['5% off on orders of 4+ items', 'Free birthday ice cream'],
                pointsRate: 1.5,
                benefits: [
                    "Earn 1.5 points per dollar spent",
                    "5% discount on orders of 4+ items",
                    "Free ice cream on your birthday"
                ]
            },
            Diamond: {
                discounts: ['5% off on orders of 4+ items', 'Free birthday ice cream', 'Priority ordering'],
                pointsRate: 2,
                benefits: [
                    "Earn 2 points per dollar spent",
                    "5% discount on orders of 4+ items",
                    "Free ice cream on your birthday",
                    "Priority ordering"
                ]
            }
        };

        const nextLevel = this.getNextLevel(level);

        return {
            currentBenefits: benefits[level] || benefits.Bronze,
            nextLevel,
            nextLevelBenefits: nextLevel ? benefits[nextLevel] : null
        };
    }

    static getNextLevel(currentLevel) {
        const levels = ['Bronze', 'Silver', 'Gold', 'Diamond'];
        const currentIndex = levels.indexOf(currentLevel);
        return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
    }

    static async updateCustomerPoints(customerId, points) {
        try {
            await pool.query(
                customerQueries.updateCustomerPoints,
                [points, points, points, points, customerId]
            );

            return this.getCustomerAccount(customerId);
        } catch (error) {
            console.error('Service - updateCustomerPoints error:', error);
            throw error;
        }
    }
}

module.exports = CustomerService;