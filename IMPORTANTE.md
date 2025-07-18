# ⚠️ IMPORTANTE - LEE ANTES DE USAR

## 🎯 Este es un Proyecto Genérico

Este backend está diseñado para ser **completamente genérico** y reutilizable por cualquier desarrollador o empresa.

## 🔧 Configuración Obligatoria

**ANTES DE USAR EN PRODUCCIÓN, DEBES:**

### 1. Variables de Entorno
Cambiar TODAS las credenciales en el archivo `.env`:

```env
# ❌ NO usar estos valores por defecto
DB_USER=tu_usuario_db          # Cambiar por tu usuario real
DB_PASSWORD=tu_password_db     # Cambiar por tu password real
EMAIL_USER=noreply@tudominio.com  # Cambiar por tu email real
EMAIL_PASS=tu_password_email   # Cambiar por tu password real
JWT_SECRET=tu-clave-secreta-muy-segura-y-larga-minimo-32-caracteres
ADMIN_PASSWORD=tu_password_admin_seguro
```

### 2. Base de Datos
- Cambiar el nombre de la base de datos de `contact_form_db` a tu preferencia
- Actualizar las credenciales de conexión
- Ejecutar el script SQL incluido

### 3. Configuración de Email
- Configurar tu servidor SMTP real
- Actualizar las direcciones de email de origen y destino
- Probar con `/api/test-email`

### 4. Seguridad
- Generar JWT_SECRET único y seguro (mínimo 32 caracteres)
- Crear contraseñas seguras para admin
- Configurar CORS solo para tus dominios

## 🌍 URLs y Dominios

Reemplazar en todos los archivos:
- `tudominio.com` → tu dominio real
- `tu-usuario` → tu usuario de GitHub
- `contact-form-backend` → nombre de tu proyecto

## 📧 Sistema de Email

El sistema enviará emails con la información del contacto. Personalizar:
- Subject del email
- Plantilla HTML
- Información de la empresa

## 🚀 Para Desarrollo

1. Copia `.env.example` a `.env`
2. Configura tus credenciales
3. Ejecuta `npm install`
4. Ejecuta `npm run dev`

## 🔒 Para Producción

- Usar `NODE_ENV=production`
- Configurar variables de entorno en tu servidor
- Usar base de datos segura
- Configurar HTTPS
- Usar PM2 o similar para gestión de procesos

## 📚 Documentación

- `README.md` - Documentación principal
- `API_DOCUMENTATION.md` - Documentación técnica de la API
- `database.sql` - Script de base de datos

---

**Recuerda**: Este es un template genérico. ¡Personalízalo según tus necesidades!
