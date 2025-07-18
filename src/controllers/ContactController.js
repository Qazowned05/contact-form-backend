const { validationResult } = require('express-validator');
const ContactModel = require('../models/ContactModel');
const EmailService = require('../services/EmailService');

class ContactController {
    static async createContact(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos inválidos',
                    errors: errors.array()
                });
            }

            const { nombres, correo, numero, consulta } = req.body;
            const ip_address = req.ip || req.connection.remoteAddress;
            const user_agent = req.get('User-Agent');

            const contactId = await ContactModel.create({
                nombres,
                correo,
                numero,
                consulta,
                ip_address,
                user_agent
            });

            console.log('Contacto guardado en la base de datos:', contactId);

            const contactData = {
                id: contactId,
                nombres,
                correo,
                numero,
                consulta,
                ip_address
            };

            const emailSent = await EmailService.sendNotificationEmail(contactData);

            res.status(201).json({
                success: true,
                message: 'Contacto registrado exitosamente',
                data: {
                    id: contactId,
                    emailSent: emailSent
                }
            });

        } catch (error) {
            console.error('❌ Error procesando contacto:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    static async getAllContacts(req, res) {
        try {
            const accessInfo = {
                user: req.user.username || 'API',
                type: req.user.type,
                source: req.user.source || 'admin',
                timestamp: new Date().toISOString()
            };
            
            console.log('📋 Acceso a contactos:', accessInfo);
            
            const contacts = await ContactModel.getAll();

            res.json({
                success: true,
                data: contacts,
                meta: {
                    total: contacts.length,
                    accessedBy: accessInfo
                }
            });
        } catch (error) {
            console.error('❌ Error obteniendo contactos:', error);
            res.status(500).json({
                success: false,
                message: 'Error obteniendo contactos'
            });
        }
    }

    static async getContactById(req, res) {
        try {
            const { id } = req.params;
            
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de contacto inválido'
                });
            }

            const contact = await ContactModel.getById(id);

            if (!contact) {
                return res.status(404).json({
                    success: false,
                    message: 'Contacto no encontrado'
                });
            }

            res.json({
                success: true,
                data: contact
            });
        } catch (error) {
            console.error('❌ Error obteniendo contacto:', error);
            res.status(500).json({
                success: false,
                message: 'Error obteniendo contacto'
            });
        }
    }

    static async updateContactStatus(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos inválidos',
                    errors: errors.array()
                });
            }

            const { id } = req.params;
            const { estado } = req.body;

            const updated = await ContactModel.updateStatus(id, estado);

            if (!updated) {
                return res.status(404).json({
                    success: false,
                    message: 'Contacto no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Estado actualizado correctamente'
            });
        } catch (error) {
            console.error('Error actualizando estado:', error);
            res.status(500).json({
                success: false,
                message: 'Error actualizando estado'
            });
        }
    }
}

module.exports = ContactController;
