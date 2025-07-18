const { body } = require('express-validator');

const contactValidators = [
    body('nombres')
        .trim()
        .isLength({ min: 2, max: 255 })
        .withMessage('El nombre debe tener entre 2 y 255 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('El nombre solo puede contener letras y espacios'),
    
    body('correo')
        .isEmail()
        .normalizeEmail()
        .withMessage('Debe ser un email válido')
        .isLength({ max: 255 })
        .withMessage('El email no puede exceder 255 caracteres'),
    
    body('numero')
        .trim()
        .matches(/^[\+]?[0-9\s\-\(\)]{7,20}$/)
        .withMessage('El número de teléfono no es válido'),
    
    body('consulta')
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('La consulta debe tener entre 10 y 2000 caracteres')
];

const loginValidators = [
    body('username')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Usuario requerido'),
    body('password')
        .isLength({ min: 1 })
        .withMessage('Contraseña requerida')
];

const statusValidators = [
    body('estado')
        .isIn(['nuevo', 'en_proceso', 'contactado', 'cerrado'])
        .withMessage('Estado inválido')
];

module.exports = {
    contactValidators,
    loginValidators,
    statusValidators
};
