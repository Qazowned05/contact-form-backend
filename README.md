# Contact Form Backend API

Backend profesional para el manejo de formularios de contacto con arquitectura modular, autenticación JWT y notificaciones por email.

Contact Form Backend es una API REST diseñada para manejar formularios de contacto. Cuenta con una arquitectura modular, autenticación para administradores, validación de datos, y notificaciones por email de forma automatica

> Este es un proyecto genérico diseñado para ser reutilizado por cualquier desarrollador. Simplemente clona, configura las variables de entorno con tus datos y ¡listo para usar!

## Características

- **Arquitectura Modular**: Código organizado en controllers, models, services y middleware
- **Autenticación JWT**: Sistema seguro con tokens para administradores
- **Notificaciones Email**: Envío automático de notificaciones con plantilla HTML
- **Seguridad Avanzada**: Rate limiting, CORS, validación de datos y sanitización
- **Panel Admin**: API completa para gestión de contactos con estados
- **Integración APIs**: Compatible con workflows de automatización (N8N, Zapier, etc.)

## Tecnologías

- **Backend**: Node.js + Express.js
- **Base de Datos**: MySQL
- **Autenticación**: JWT (JSON Web Tokens)
- **Email**: Nodemailer
- **Validación**: Express Validator
- **Seguridad**: Helmet, CORS, Rate Limiting

## Estructura del Proyecto

```
contact-form-backend/
├── src/
│   ├── config/           # Configuraciones (DB, Email, Auth)
│   ├── controllers/      # Lógica de negocio
│   ├── models/          # Modelos de datos
│   ├── services/        # Servicios externos
│   ├── middleware/      # Middleware personalizado
│   ├── routes/          # Definición de rutas
│   ├── validators/      # Validadores de datos
│   └── index.js         # Punto de entrada alternativo
├── server-refactored.js # Servidor principal
├── package.json
├── README.md
├── API_DOCUMENTATION.md
├── database.sql
└── .env.example
```

## Instalación y Configuración

### Prerequisitos

- Node.js 16 o superior
- MySQL 8.0 o superior
- NPM o Yarn

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Qazowned05/contact-form-backend.git
cd contact-form-backend
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Configuración del Servidor
PORT=5000
NODE_ENV=development

# Base de Datos MySQL
DB_HOST=localhost
DB_USER=tu_usuario_db
DB_PASSWORD=tu_password_db
DB_NAME=contact_form_db
DB_PORT=3306

# Configuración de Email (cPanel/SMTP)
EMAIL_HOST=mail.tudominio.com
EMAIL_PORT=465
EMAIL_USER=noreply@tudominio.com
EMAIL_PASS=tu_password_email
EMAIL_FROM=noreply@tudominio.com
EMAIL_TO=admin@tudominio.com

# Autenticación
JWT_SECRET=tu-clave-secreta-muy-segura-y-larga-minimo-32-caracteres
ADMIN_USER=admin
ADMIN_PASSWORD=tu_password_admin_seguro
API_TOKEN=tu-token-api-para-integraciones

# URLs permitidas (Frontend)
FRONTEND_URL=http://localhost:3000
PRODUCTION_URL=https://tudominio.com
```

> **Importante**: Cambia TODAS las credenciales por las tuyas antes de usar en producción.

### 4. Configurar Base de Datos

Ejecutar el siguiente script SQL en MySQL:

```sql
CREATE DATABASE contact_form_db;
USE contact_form_db;

CREATE TABLE contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    consulta TEXT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    estado ENUM('nuevo', 'en_proceso', 'contactado', 'cerrado') DEFAULT 'nuevo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

> También puedes usar el archivo `database.sql` incluido en el proyecto.

### 5. Iniciar el Servidor

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## API Endpoints

### Contactos (Público)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/contact` | Crear nuevo contacto |

### Administración (Protegido)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/admin/login` | Login de administrador |
| GET | `/api/admin/verify` | Verificar token |
| GET | `/api/admin/contacts` | Listar todos los contactos |
| GET | `/api/admin/contacts/:id` | Obtener contacto específico |
| PATCH | `/api/admin/contacts/:id/status` | Actualizar estado |

### Utilidades

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/test` | Test de API |
| GET | `/api/test-email` | Verificar configuración email |
| GET | `/api/debug-email` | Debug email (solo desarrollo) |

## Ejemplos de Uso

### Crear Contacto

```javascript
const response = await fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nombres: 'Juan Pérez',
    correo: 'juan@ejemplo.com',
    numero: '+1234567890',
    consulta: 'Necesito información sobre sus servicios'
  })
});

const data = await response.json();
console.log(data);
```

### Login Administrador

```javascript
const response = await fetch('http://localhost:5000/api/admin/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'admin',
    password: 'tu_password_admin'
  })
});

const { data } = await response.json();
const token = data.token;
```

### Obtener Contactos (Admin)

```javascript
const response = await fetch('http://localhost:5000/api/admin/contacts', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const contactos = await response.json();
```

## Seguridad

- **Rate Limiting**: 10 requests por 15 minutos en `/api/contact`
- **Validación**: Sanitización y validación de todos los inputs
- **CORS**: Configurado para dominios específicos
- **Helmet**: Headers de seguridad
- **JWT**: Tokens con expiración de 24 horas
- **Environment Variables**: Configuración sensible en variables de entorno

## Sistema de Email

### Características

- Plantillas HTML responsivas
- Compatible con cPanel/webmail
- Información completa del contacto
- Diseño profesional con gradientes
- Metadatos de tracking (IP, fecha, etc.)

### Configuración para Hosting Compartido

```env
EMAIL_HOST=mail.tudominio.com
EMAIL_PORT=465
EMAIL_USER=noreply@tudominio.com
EMAIL_PASS=password_del_email
```

## Despliegue

### Heroku

```bash
# Instalar Heroku CLI
npm install -g heroku

# Login y crear app
heroku login
heroku create tu-app-name

# Configurar variables de entorno
heroku config:set NODE_ENV=production
heroku config:set DB_HOST=tu_host_db
# ... más variables

# Deploy
git push heroku main
```

### VPS/Servidor Dedicado

```bash
# Con PM2
npm install -g pm2
pm2 start server-refactored.js --name "contact-form-backend"
pm2 startup
pm2 save

# Con Docker
docker build -t contact-form-backend .
docker run -p 5000:5000 contact-form-backend
```

## Testing

```bash
# Test de conexión
curl http://localhost:5000/health

# Test de API
curl http://localhost:5000/api/test

# Test de email
curl http://localhost:5000/api/test-email
```

## Monitoreo y Logs

El servidor incluye logging automático de:
- Conexiones a la base de datos
- Envío de emails
- Accesos de administradores
- Errores del sistema


## Soporte

Para soporte técnico o preguntas:


## Contribuir al Proyecto

¡Las contribuciones son bienvenidas! Este proyecto está diseñado para ser:

- **Código Abierto**: Libre para usar, modificar y distribuir
- **Genérico**: Fácil de adaptar a cualquier proyecto
- **Educativo**: Buena base para aprender arquitectura Node.js

---

**Contact Form Backend** - Desarrollado con ❤️ para la comunidad, por Qazowned05 (visita mi web de implementaciones: www.qazflow.com)
