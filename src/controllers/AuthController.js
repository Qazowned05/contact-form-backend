const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { ADMIN_USER, ADMIN_PASSWORD, JWT_SECRET } = require('../config/auth');

class AuthController {
    static async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos inválidos',
                    errors: errors.array()
                });
            }

            const { username, password } = req.body;

            if (username !== ADMIN_USER || password !== ADMIN_PASSWORD) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }

            const token = jwt.sign(
                { 
                    username: ADMIN_USER, 
                    type: 'admin',
                    iat: Math.floor(Date.now() / 1000)
                },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                success: true,
                message: 'Login exitoso',
                data: {
                    token,
                    expiresIn: '24h',
                    username: ADMIN_USER
                }
            });

        } catch (error) {
            console.error('❌ Error en login admin:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    static async verifyToken(req, res) {
        res.json({
            success: true,
            message: 'Token válido',
            user: {
                username: req.user.username,
                type: req.user.type,
                source: req.user.source
            }
        });
    }
}

module.exports = AuthController;
