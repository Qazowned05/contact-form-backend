const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const contactRoutes = require('./src/routes/contacts');
const authRoutes = require('./src/routes/auth');
const utilRoutes = require('./src/routes/utils');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
}));

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            process.env.FRONTEND_URL, 
            process.env.PRODUCTION_URL,
            'http://localhost:3000', 
            'https://tudominio.com',
            'https://www.tudominio.com'
        ];
        
        if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(null, true);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        error: 'Demasiadas solicitudes, intenta de nuevo en 15 minutos'
    }
});

app.use('/api/contact', limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', contactRoutes);
app.use('/api', authRoutes);
app.use('/api', utilRoutes);
app.use('/', utilRoutes);

app.use((err, req, res, next) => {
    console.error('Error no manejado:', err);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
    });
});

app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📧 Emails se enviarán a: ${process.env.EMAIL_TO}`);
    console.log(`🔗 Frontend permitido desde: ${process.env.FRONTEND_URL}`);
});

module.exports = app;
