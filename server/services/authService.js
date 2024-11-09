const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
const { AUTH_ERRORS } = require('../utils/constants');
const { authQueries } = require('../models/authQueries');

class AuthService {
    static generateToken(user, role) {
        const payload = {
            id: role === 'admin' ? user.Admin_ID : 
                role === 'employee' ? user.Employee_ID : 
                user.Customer_ID,
            firstName: user.First_Name,
            lastName: user.Last_Name,
            role: role
        };

        if (role === 'admin') {
            payload.username = user.Username;
        }

        return jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: role === 'customer' ? '24h' : '8h' }
        );
    }

    static async adminLogin(credentials) {
        try {
            const [admins] = await pool.query(
                authQueries.getAdminByCredentials,
                [credentials.username, credentials.password] // In production, use proper password hashing
            );

            if (admins.length === 0) {
                throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
            }

            const admin = admins[0];
            const token = this.generateToken(admin, 'admin');

            return {
                token,
                user: {
                    id: admin.Admin_ID,
                    firstName: admin.First_Name,
                    lastName: admin.Last_Name,
                    username: admin.Username,
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