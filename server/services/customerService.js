const { pool } = require('../config/db');
const { CUSTOMER_ERRORS } = require('../utils/constants');
const { customerQueries } = require('../models/customerQueries');
const { transactionQueries } = require('../models/transactionQueries');

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

    static async registerCustomer(customerData) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Check for existing customer
            const [existing] = await connection.query(
                customerQueries.getCustomerByPhone,
                [customerData.phoneNumber]
            );

            if (existing.length > 0) {
                throw new Error(CUSTOMER_ERRORS.ALREADY_EXISTS);
            }

            // Insert new customer
            const [result] = await connection.query(
                customerQueries.createCustomer,
                [
                    customerData.phoneNumber,
                    customerData.address,
                    customerData.firstName,
                    customerData.lastName,
                    customerData.dateOfBirth
                ]
            );

            const customerId = result.insertId;

            // Get the newly created customer data
            const [newCustomer] = await connection.query(
                customerQueries.getCustomerById,
                [customerId]
            );

            await connection.commit();
            return newCustomer[0];

        } catch (error) {
            await connection.rollback();
            console.error('Service - registerCustomer error:', error);
            throw error;
        } finally {
            connection.release();
        }
    }


    // Place order
    static async placeOrder(customerId, orderData) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Get customer data for membership check
        const [customerData] = await connection.query(
            customerQueries.getCustomerById,
            [customerId]
        );

        // Calculate discount
        let discountPercentage = 0;
        if (customerData[0].Membership_Level !== 'Bronze' && orderData.items.length >= 4) {
            discountPercentage = 5;
        }

        const discountAmount = Math.round((orderData.total * discountPercentage) / 100);
        const finalTotal = orderData.total - discountAmount;

        // Create transaction
        const [transactionResult] = await connection.query(
            transactionQueries.createTransaction,
            [customerId, finalTotal, 'Credit Card', discountPercentage, discountAmount]
        );

        const transactionId = transactionResult.insertId;

        // Consolidate items by ID and sum quantities
        const consolidatedItems = orderData.items.reduce((acc, item) => {
            if (!acc[item.Item_ID]) {
                acc[item.Item_ID] = { ...item };
            } else {
                acc[item.Item_ID].quantity += item.quantity;
            }
            return acc;
        }, {});

        // Create transaction items
        for (const itemId in consolidatedItems) {
            const item = consolidatedItems[itemId];
            
            // Check inventory
            const [inventoryResult] = await connection.query(
                'SELECT Quantity FROM item WHERE Item_ID = ?',
                [item.Item_ID]
            );

            if (!inventoryResult.length || inventoryResult[0].Quantity < item.quantity) {
                throw new Error(CUSTOMER_ERRORS.INSUFFICIENT_STOCK);
            }

            // Create transaction item
            await connection.query(
                transactionQueries.createTransactionItem,
                [transactionId, item.Item_ID, item.quantity]
            );

            // Update inventory
            await connection.query(
                'UPDATE item SET Quantity = Quantity - ? WHERE Item_ID = ?',
                [item.quantity, item.Item_ID]
            );
        }

        // Update points (1 point per dollar)
        const pointsEarned = Math.floor(finalTotal);
        await this.updateCustomerPoints(connection, customerId, pointsEarned);

        await connection.commit();

        return {
            transactionId,
            total: finalTotal,
            discountApplied: discountAmount,
            pointsEarned
        };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

    static async placeGuestOrder(orderData) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const { 
                items, 
                total, 
                customerInfo: { 
                    name, 
                    phoneNumber, 
                    address 
                } 
            } = orderData;

            // Create transaction for guest
            const [transactionResult] = await connection.query(
                transactionQueries.createGuestOrder,
                [
                    total,
                    'Credit Card', // Payment type - you might want to make this configurable
                    name,
                    phoneNumber,
                    address
                ]
            );

            const transactionId = transactionResult.insertId;

            // Create transaction items
            for (const item of items) {
                await connection.query(
                    transactionQueries.createTransactionItem,
                    [transactionId, item.Item_ID, item.quantity]
                );

                // Update inventory (if you're tracking inventory)
                await connection.query(
                    'UPDATE item SET Quantity = Quantity - ? WHERE Item_ID = ?',
                    [item.quantity, item.Item_ID]
                );
            }

            await connection.commit();
            
            return {
                transactionId,
                total,
                message: 'Order placed successfully'
            };

        } catch (error) {
            await connection.rollback();
            console.error('Service - placeGuestOrder error:', error);
            throw error;
        } finally {
            connection.release();
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

    static async updateCustomerPoints(connection, customerId, points) {
        await connection.query(
            customerQueries.updateCustomerPoints,
            [points, points, points, points, customerId]
        );
    }
}

module.exports = CustomerService;