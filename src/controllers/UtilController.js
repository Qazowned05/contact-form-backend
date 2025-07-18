const EmailService = require('../services/EmailService');

class UtilController {
    static async testApi(req, res) {
        res.json({
            success: true,
            message: 'Contact Form Backend funcionando correctamente',
            timestamp: new Date().toISOString()
        });
    }

    static async healthCheck(req, res) {
        res.json({
            status: 'OK',
            message: 'Contact Form Backend está funcionando',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV,
            version: '1.0.0'
        });
    }

    static async testEmail(req, res) {
        try {
            const result = await EmailService.verifyEmailConfig();
            
            if (result.success) {
                res.json(result);
            } else {
                res.status(500).json(result);
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error verificando configuración de email',
                error: error.message
            });
        }
    }

    static async debugEmail(req, res) {
        if (process.env.NODE_ENV !== 'development') {
            return res.status(403).json({ error: 'Solo disponible en desarrollo' });
        }
        
        res.json({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            user: process.env.EMAIL_USER,
            passwordLength: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0,
            passwordFirst3: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.substring(0, 3) + '...' : 'undefined',
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO
        });
    }
}

module.exports = UtilController;
