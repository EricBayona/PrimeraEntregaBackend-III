# imagen de Docker

ejfb/adoptme-app:1.0.0

# Adoptme Backend

Este proyecto es el backend de **Adoptme**, una plataforma integral para la adopción responsable de mascotas.

## Descripción

Adoptme Backend proporciona una API robusta para gestionar usuarios, mascotas, procesos de adopción, notificaciones y más. Permite la interacción segura entre adoptantes y protectoras, facilitando la publicación, búsqueda y seguimiento de mascotas en adopción.

## Características principales

- **Gestión de usuarios:** Registro, inicio de sesión.
- **Gestión de mascotas:** CRUD de mascotas.
- **Adopciones:** Solicitud de adopciones.

- **Documentación interactiva:** Swagger/OpenAPI para explorar y probar los endpoints.

- **Seguridad:** Autenticación JWT, validación de datos, control de acceso por roles.

- **Subida de archivos:** Documentos e imágenes con Multer.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- Multer (gestión de archivos)
- Swagger/OpenAPI
- Winston (logger)

## Instalación

```bash
git clone https://github.com/EricBayona/EntregaFina-Backend-III.git
cd RecursosBackend-Adoptme-main
npm install
```

## Configuración

1. Crea un archivo `.env` con las variables necesarias (ver `.env.example`).
2. Configura la conexión a MongoDB y las credenciales de servicios externos (email, almacenamiento, etc).

## Uso

```bash
npm start
```

El servidor estará disponible en `http://localhost:3000` (puerto configurable).

## Endpoints principales

- `POST /api/sessions/register` - Registro de usuarios
- `POST /api/sessions/login` - Inicio de sesión
- `GET /api/pets` - Listado de mascotas
- `POST /api/pets` - Publicar mascota
- `POST /api/adoptions/:uid/:pid` - Solicitar adopción

Consulta la documentación Swagger en `/api-docs` para ver todos los endpoints y probarlos.

## 🧪 Testing

El proyecto cuenta con una suite de tests ubicada en la carpeta /test, dividida en distintas áreas:

test/dao/ - Pruebas de acceso a datos (DAO) usando Mocha y Chai

test/dto/ - Pruebas de lógica DTO también con Mocha y Chai

test/routes/ - Pruebas de rutas (adoptions, pets, users, sessions) usando Supertest

Para correr los tests:

```bash
npm test
```

## Licencia

MIT
