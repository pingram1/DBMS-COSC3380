const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
const { AUTH_ERRORS } = require('../utils/constants');
const { authQueries } = require('../models/authQueries');

class AuthService {
    static generateToken(user, role) {
        return jwt.sign(
            {
                id: role === 'admin' ? user.Employee_ID : user.Customer_ID,
                firstName: user.First_Name,
                lastName: user.Last_Name,
                role: role
            },
            process.env.JWT_SECRET,
            { expiresIn: role === 'admin' ? '8h' : '24h' }
        );
    }

    static async adminLogin(credentials) {
        try {
            const [employees] = await pool.query(
                authQueries.getEmployeeByCredentials,
                [credentials.employeeId, credentials.firstName, credentials.lastName]
            );

            if (employees.length === 0) {
                throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
            }

            const employee = employees[0];
            const token = this.generateToken(employee, 'admin');

            return {
                token,
                user: {
                    id: employee.Employee_ID,
                    firstName: employee.First_Name,
                    lastName: employee.Last_Name,
                    role: 'admin'
                }
            };
        } catch (error) {
            throw error;
        }
    }

    static async employeeLogin(credentials) {
        try {
            const [employees] = await pool.query(
                authQueries.getEmployeeByCredentials,
                [credentials.employeeId, credentials.firstName, credentials.lastName]
            );

            if (employees.length === 0) {
                throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
            }

            const employee = employees[0];
            const token = this.generateToken(employee, 'employee');

            return {
                token,
                user: {
                    id: employee.Employee_ID,
                    firstName: employee.First_Name,
                    lastName: employee.Last_Name,
                    role: 'employee'
                }
            };
        } catch (error) {
            throw error;
        }
    }

    static async customerLogin(phoneNumber) {
        try {
            const [customers] = await pool.query(
                authQueries.getCustomerByPhone,
                [phoneNumber]
            );

            if (customers.length === 0) {
                throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
            }

            const customer = customers[0];
            const token = this.generateToken(customer, 'customer');

            return {
                token,
                user: {
                    id: customer.Customer_ID,
                    phoneNumber: customer.Phone_Number,
                    membershipLevel: customer.Membership_Level,
                    role: 'customer'
                }
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthService;