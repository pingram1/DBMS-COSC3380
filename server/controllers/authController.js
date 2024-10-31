const AuthService = require('../services/authService');
const { validateEmployeeData, validateCustomerData } = require('../utils/validation');

class AuthController {
    static async adminLogin(req, res) {
        try {
            validateEmployeeData(req.body);
            const authResult = await AuthService.adminLogin(req.body);
            res.json(authResult);
        } catch (error) {
            throw error
        }
    }

    static async customerLogin(req, res) {
        try {
            validateCustomerData(req.body);
            const authResult = await AuthService.customerLogin(req.body.phoneNumber);
            res.json(authResult);
        } catch (error) {
            throw error
        }
    }
}

module.exports = AuthController;