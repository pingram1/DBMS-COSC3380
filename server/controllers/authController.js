const AuthService = require('../services/authService');
const { AUTH_ERRORS } = require('../utils/constants');

class AuthController {
    static async adminLogin(req, res) {
        try {
            const authResult = await AuthService.adminLogin(req.body);
            res.json(authResult);
        } catch (error) {
            res.status(401).json({ 
                error: error.message || AUTH_ERRORS.INVALID_CREDENTIALS
            });
        }
    }

    static async employeeLogin(req, res) {
        try {
            const authResult = await AuthService.employeeLogin(req.body);
            res.json(authResult);
        } catch (error) {
            res.status(401).json({ 
                error: error.message || AUTH_ERRORS.INVALID_CREDENTIALS
            });
        }
    }    

    static async customerLogin(req, res) {
        try {
            const authResult = await AuthService.customerLogin(req.body.phoneNumber);
            res.json(authResult);
        } catch (error) {
            res.status(401).json({ 
                error: error.message || AUTH_ERRORS.INVALID_CREDENTIALS
            });
        }
    }
}

module.exports = AuthController;