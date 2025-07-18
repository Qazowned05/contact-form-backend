const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/ContactController');
const { authenticateAdmin } = require('../middleware/auth');
const { contactValidators, statusValidators } = require('../validators');

router.post('/contact', contactValidators, ContactController.createContact);
router.get('/admin/contacts', authenticateAdmin, ContactController.getAllContacts);
router.get('/admin/contacts/:id', authenticateAdmin, ContactController.getContactById);
router.patch('/admin/contacts/:id/status', authenticateAdmin, statusValidators, ContactController.updateContactStatus);

module.exports = router;
