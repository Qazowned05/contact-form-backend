const jwt = require('jsonwebtoken');
const { JWT_SECRET, API_TOKEN } = require('../config/auth');

const authenticateAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Token de autorización requerido'
            });
        }

        const token = authHeader.split(' ')[1];
        
        if (token === API_TOKEN) {
            req.user = { type: 'api', source: 'n8n' };
            return next();
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido o expirado'
        });
    }
};

module.exports = { authenticateAdmin };
