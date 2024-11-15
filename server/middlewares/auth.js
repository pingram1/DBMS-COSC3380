const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Middleware to check if user is admin or employee
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'employee') {
        return res.status(403).json({ error: 'Admin/Employee access required' });
    }
    next();
};

// Middleware to check if user is admin 
const isStrictAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};

module.exports = { authMiddleware, isAdmin, isStrictAdmin };