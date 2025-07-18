const { connectDB } = require('../config/database');

class ContactModel {
    static async create(contactData) {
        const connection = await connectDB();
        
        const insertQuery = `
            INSERT INTO contactos (nombres, correo, numero, consulta, ip_address, user_agent) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        try {
            const [result] = await connection.execute(insertQuery, [
                contactData.nombres,
                contactData.correo,
                contactData.numero,
                contactData.consulta,
                contactData.ip_address,
                contactData.user_agent
            ]);
            
            return result.insertId;
        } finally {
            await connection.end();
        }
    }

    static async getAll() {
        const connection = await connectDB();
        
        try {
            const [rows] = await connection.execute(
                'SELECT id, nombres, correo, numero, consulta, fecha_creacion, estado, ip_address FROM contactos ORDER BY fecha_creacion DESC'
            );
            return rows;
        } finally {
            await connection.end();
        }
    }

    static async getById(id) {
        const connection = await connectDB();
        
        try {
            const [rows] = await connection.execute(
                'SELECT * FROM contactos WHERE id = ?',
                [id]
            );
            return rows[0] || null;
        } finally {
            await connection.end();
        }
    }

    static async updateStatus(id, estado) {
        const connection = await connectDB();
        
        try {
            const [result] = await connection.execute(
                'UPDATE contactos SET estado = ? WHERE id = ?',
                [estado, id]
            );
            return result.affectedRows > 0;
        } finally {
            await connection.end();
        }
    }
}

module.exports = ContactModel;
