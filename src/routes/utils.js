const express = require('express');
const router = express.Router();
const UtilController = require('../controllers/UtilController');

router.get('/test', UtilController.testApi);
router.get('/health', UtilController.healthCheck);
router.get('/test-email', UtilController.testEmail);
router.get('/debug-email', UtilController.debugEmail);

module.exports = router;
