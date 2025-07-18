const transporter = require('../config/email');

class EmailService {
    static async sendNotificationEmail(contactData) {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: `Nuevo Lead #${contactData.id} - ${contactData.nombres} | Formulario de Contacto`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0; text-align: center;">Nuevo Lead #${contactData.id} - Formulario de Contacto</h1>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
                        <h2 style="color: #333; margin-bottom: 20px;">Información del Contacto:</h2>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #667eea;">
                            <p style="margin: 0; color: #666;"><strong style="color: #333;">ID Lead:</strong> #${contactData.id}</p>
                        </div>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #667eea;">
                            <p style="margin: 0; color: #666;"><strong style="color: #333;">Nombre:</strong> ${contactData.nombres}</p>
                        </div>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #667eea;">
                            <p style="margin: 0; color: #666;"><strong style="color: #333;">Email:</strong> <a href="mailto:${contactData.correo}" style="color: #667eea;">${contactData.correo}</a></p>
                        </div>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #667eea;">
                            <p style="margin: 0; color: #666;"><strong style="color: #333;">Teléfono:</strong> <a href="tel:${contactData.numero}" style="color: #667eea;">${contactData.numero}</a></p>
                        </div>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #667eea;">
                            <p style="margin: 0 0 10px 0; color: #333;"><strong>Consulta:</strong></p>
                            <p style="margin: 0; color: #666; line-height: 1.6;">${contactData.consulta}</p>
                        </div>
                        
                        <div style="background: #e9ecef; padding: 15px; border-radius: 8px; border-left: 4px solid #6c757d;">
                            <p style="margin: 0; color: #666; font-size: 14px;"><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
                            ${contactData.ip_address ? `<p style="margin: 5px 0 0 0; color: #666; font-size: 14px;"><strong>IP:</strong> ${contactData.ip_address}</p>` : ''}
                        </div>
                    </div>
                    
                    <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 0 0 10px 10px;">
                        <p style="margin: 0; color: #666; font-size: 14px;">Este email fue generado automáticamente desde tu aplicación</p>
                    </div>
                </div>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Email de notificación enviado correctamente');
            return true;
        } catch (error) {
            console.error('Error enviando email:', error);
            return false;
        }
    }

    static async verifyEmailConfig() {
        try {
            await transporter.verify();
            return { success: true, message: 'Configuración de email correcta' };
        } catch (error) {
            return { 
                success: false, 
                message: 'Error en configuración de email', 
                error: error.message 
            };
        }
    }
}

module.exports = EmailService;
