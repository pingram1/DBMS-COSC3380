const { pool } = require('../config/db');
const { employee_ERRORS } = require('../utils/constants');
const { employeeQueries } = require('../models/employeeQueries');
const { transactionQueries } = require('../models/transactionQueries');

class EmployeeService {
    static async getEmployeeAccount(employeeId) {
        try {
            const [employeeRows] = await pool.query(
                employeeQueries.getEmployeeById,
                [employeeId]
            );

            if (employeeRows.length === 0) {
                throw new Error(employee_ERRORS.NOT_FOUND);
            }

            const employeeData = employeeRows[0];

            return {
                ...employeeData,
            };
        } catch (error) {
            console.error('Service - getEmployeeAccount error:', error);
            throw error;
        }
    }

    static async getEmployeeOrders(employeeId) {
        try {
            const [orders] = await pool.query(
                employeeQueries.getEmployeeOrders,
                [employeeId]
            );

            return orders;
        } catch (error) {
            console.error('Service - getEmployeeOrders error:', error);
            throw error;
        }
    }

    static async registerEmployee(employeeData) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Check for existing employee
            const [existing] = await connection.query(
                employeeQueries.getEmployeeByID,
                [employeeData.phoneNumber]
            );

            if (existing.length > 0) {
                throw new Error(employee_ERRORS.ALREADY_EXISTS);
            }

            // Insert new employee
            const [result] = await connection.query(
                employeeQueries.createEmployee,
                [
                    employeeData.phoneNumber,
                    employeeData.address,
                    employeeData.firstName,
                    employeeData.lastName,
                    employeeData.dateOfBirth
                ]
            );

            const employeeId = result.insertId;

            // Get the newly created employee data
            const [newEmployee] = await connection.query(
                employeeQueries.getEmployeeById,
                [employeeId]
            );

            await connection.commit();
            return newEmployee[0];

        } catch (error) {
            await connection.rollback();
            console.error('Service - registerEmployee error:', error);
            throw error;
        } finally {
            connection.release();
        }
    }


   
}

module.exports = employeeService;
