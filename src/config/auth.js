const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'tu-clave-secreta-muy-segura';
const API_TOKEN = process.env.API_TOKEN || 'tu-token-api-para-n8n';

module.exports = {
    ADMIN_USER,
    ADMIN_PASSWORD,
    JWT_SECRET,
    API_TOKEN
};
