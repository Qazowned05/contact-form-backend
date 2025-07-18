const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { authenticateAdmin } = require('../middleware/auth');
const { loginValidators } = require('../validators');

router.post('/admin/login', loginValidators, AuthController.login);
router.get('/admin/verify', authenticateAdmin, AuthController.verifyToken);

module.exports = router;
