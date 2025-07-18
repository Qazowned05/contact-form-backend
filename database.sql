-- Configuración de Base de Datos para Contact Form Backend
-- Ejecutar este script en MySQL para crear la estructura necesaria

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS contact_form_db;
USE contact_form_db;

-- Crear tabla de contactos
CREATE TABLE IF NOT EXISTS contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    consulta TEXT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    estado ENUM('nuevo', 'en_proceso', 'contactado', 'cerrado') DEFAULT 'nuevo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_estado (estado),
    INDEX idx_fecha_creacion (fecha_creacion),
    INDEX idx_correo (correo)
);

-- Insertar datos de ejemplo (opcional)
INSERT INTO contactos (nombres, correo, numero, consulta, ip_address) VALUES
('Juan Pérez', 'juan@ejemplo.com', '+1234567890', 'Consulta sobre servicios de desarrollo web', '192.168.1.1'),
('María García', 'maria@ejemplo.com', '+0987654321', 'Información sobre precios', '192.168.1.2'),
('Carlos López', 'carlos@ejemplo.com', '+1122334455', 'Solicitud de cotización para proyecto', '192.168.1.3');
