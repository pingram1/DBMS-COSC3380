const EmployeeService = require('../services/employeeService');
const { EMPLOYEE_ERRORS } = require('../utils/constants');

class EmployeeController {
    static async getEmployeeAcc(req, res) {
        try {
            const items = await EmployeeService.getEmployeeAccount();
            res.json(items);
        } catch (error) {
            console.error('Controller - getEmployeeAcc error:', error);
            res.status(500).json({ error: error.message });
        }
    }
  
    static async getEmployeeOrderHistory(req, res) {
        try {
            const items = await employeeService.getEmployeeOrder();
            res.json(items);
        } catch (error) {
            console.error('Controller - getEmployeeOrderHistory error:', error);
            res.status(500).json({ error: error.message });
        }
    }
    
    static async registerEmployee(req, res) {
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
                    error: EMPLOYEE_ERRORS.INVALID_INPUT 
                });
            }

            const employeeData = await employeeService.registeremployee({
                firstName,
                lastName,
                phoneNumber,
                dateOfBirth,
                address
            });

            res.status(201).json({
                message: 'Registration successful',
                employee: employeeData
            });

        } catch (error) {
            console.error('Controller - register error:', error);
            
            let statusCode = 500;
            let errorMessage = 'Internal server error';

            if (error.message === EMPLOYEE_ERRORS.ALREADY_EXISTS) {
                statusCode = 409;
                errorMessage = 'Phone number already registered';
            } else if (error.message === EMPLOYEE_ERRORS.INVALID_INPUT) {
                statusCode = 400;
                errorMessage = 'Missing required fields';
            }

            res.status(statusCode).json({ error: errorMessage });
        }
    }
    

    
}

module.exports = EmployeeController;
