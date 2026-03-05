# Heaven Flavor - Sistema de Gestión de Restaurantes
> **Nota**: Este proyecto ha sido desarrollado por el equipo de desarrollo Programming Team utilizando como base técnica y educativa la arquitectura de microservicios y las mejores prácticas de desarrollo web proporcionada por el Catedrático Braulio Echeverría (PEM) del curso IN6AV, Kinal Guatemala 2026.

## Descripción:
Este repositorio contiene el núcleo central de **Heaven Flavor**, una plataforma integral diseñada para la digitalización de la experiencia gastronómica. El sistema actúa como un ecosistema unificado que conecta a clientes, restauranteros y administradores, permitiendo desde la reserva de mesas hasta la analítica avanzada de ventas, todo bajo una arquitectura escalable, segura y de alta disponibilidad.

---

## Funcionalidades Principales:

### 1. Gestión de Identidad y Acceso (Auth)
* **Registro Multiperfil:** Sistema de registro diferenciado para Clientes y Administradores de Restaurante con validación de credenciales.
* **Autenticación Segura:** Inicio de sesión protegido mediante hashing de contraseñas y manejo de tokens de sesión (JWT).
* **Control de Roles (RBAC):** Middleware especializado para restringir acceso a funciones administrativas, edición de menús o visualización de reportes según el tipo de usuario.
* **Perfil de Usuario:** Gestión completa del perfil, incluyendo historial de consumo, preferencias y eliminación segura de cuenta.

### 2. Administración de Restaurantes y Recursos
* **Gestión de Establecimientos (CRUD):** Registro detallado de locales incluyendo horarios, categorías, ubicación geográfica y galerías fotográficas.
* **Control de Inventario de Mesas:** Sistema dinámico para gestionar la capacidad, ubicación (terraza, salón, VIP) y estados de disponibilidad en tiempo real.
* **Ingeniería de Menús:** Herramientas para la creación de menús digitales con categorización (entradas, fuertes, bebidas), gestión de ingredientes, precios y etiquetas de disponibilidad.

### 3. Motor de Reservas y Pedidos
* **Reservaciones Inteligentes:** Sistema de búsqueda y reserva que evita duplicidad de horarios y optimiza la ocupación de mesas.
* **Gestión de Pedidos Omnicanal:** Control total sobre pedidos en mesa, para llevar (Takeout) o a domicilio (Delivery).
* **Tracking en Tiempo Real:** Seguimiento detallado del estado del pedido: *En preparación*, *Listo*, *Entregado* o *Cancelado*.
* **Notificaciones Automáticas:** Alertas integradas para confirmación de servicios y avisos de tiempos de espera.

### 4. Eventos y Experiencias Gastronómicas
* **Planificación de Eventos:** Módulo para la creación de cenas temáticas, festivales y promociones especiales con fechas limitadas.
* **Asignación de Recursos:** Gestión de servicios adicionales para eventos, como decoración personalizada, música en vivo o menús de degustación exclusivos.
---

## Tecnologías Utilizadas
- Componente	Tecnología
- Runtime	Node.js y .Net
- Lenguaje	JavaScript / C#
- PostgreSQL/MongoDB
- Documentación	Postman

## Endpoints API (Authentication-Services)

Base URL: `http://localhost:5210/res`

| Método | Ruta | Descripción | 
|--------|------|-------------|
| POST | /auth/login | Iniciar sesión en una cuenta |
| PUT | /auth/register | Registrar una cuenta |
| DEL | /auth/verify-email | Verificar una cuenta |

---

## Endpoints API (restaurant-services)

Base URL: `http://localhost:3021/res`

### Restaurante (`/restaurants`)

| Método | Ruta | Descripción | 
|--------|------|-------------|
| `POST` | `/restaurants` | Agregar nuevo restaurante |
| `PUT` | `/restaurants/{id_restaurante}` | Actualizar restaurante |
| `DEL` | `/restaurants/{id_restaurante}` | Desactivar restaurante |

### Mesa (`/tables`)

| Método | Ruta | Descripción | 
|--------|------|-------------|
| `POST` | `/tables` | Agregar nueva mesa |
| `PUT` | `/tables/{id_tables}` | Actualizar mesa |
| `DEL` | `/tables/{id_tables}` | Desactivar mesa |

### Menu (`/menu`)

| Método | Ruta | Descripción | 
|--------|------|-------------|
| `POST` | `/menu` | Agregar nuevo menu |
| `PUT` | `/menu/{id_menu}` | Actualizar menu |
| `DEL` | `/menu/{id_menu}` | Desactivar menu |

---
## Endpoints API (reservation-services)

Base URL: `http://localhost:3023/res`

### Reservación (`/reservations`)

| Método | Ruta | Descripción | 
|--------|------|-------------|
| `POST` | `/reservations` | Agregar nueva reservación |
| `PUT` | `/reservations/{id_reserva}` | Actualizar reservación |
| `DEL` | `/reservations/{id_reserva}` | Desactivar reservación |
| `PATCH` | `/reservations/{id_reserva}/cancel` | Cancelar reservación |

### Orden (`/orders`)

| Método | Ruta | Descripción | 
|--------|------|-------------|
| `GET` | `/orders/restaurant/{id_restaurant}` | Visualizar ordenes del restaurante |
| `POST` | `/orders` | Agregar nueva orden |
| `PUT` | `/orders/{id_orden}` | Actualizar orden |
| `DEL` | `/orders/{id_orden}` | Desactivar orden |

---

## Endpoints API (event-services)

Base URL: `http://localhost:3022/even/events`

### Event (`/events`)

| Método | Ruta | Descripción | 
|--------|------|-------------|
| `GET` | `/events/restaurant/{id_restaurante}` | Ver eventos de restaurante |
| `POST` | `/events` | Agregar nuevo evento |
| `PUT` | `/events/{id_evento}` | Actualizar evento |
| `DEL` | `/events/{id_evento}` | Desactivar evento |

---

### Modelos de Request

#### Registro (`/auth/register`)

| Key | Type | Value | 
|--------|------|-------------|
| Name | Text | Nombre |
| Surname | Text | Apellido |
| UserName | Text | Nombre de usuario |
| Email | Text | Correo electronico |
| Password | Text | Contraseña |
| Phone | Text | Numero de telefono |
| ProfilePicture | File | Foto de perfil |

#### Inicio de sesión (`/auth/login`)
```json
{
    "EmailOrUsername": "userexample@example.com",
    "Password": "passwordexample"
}
```

#### Inicio de sesión (`/auth/verify-email`)
```json
{
    "Token":"tokedeusuario"
}
```

#### Crear Restaurante (`/restaurants`)
```json
{
  "restaurantName": "Nombre",
  "restaurantAddress": "Direccion",
  "restaurantSchedule": "Horario",
  "restaurantCategory": "Categoria",
  "averagePrice": 0,
  "contact": {
    "phone": "0000-0000",
    "email": "example@example.com"
  }
}
```

#### Actualizar restaurante (`/restaurants/{id_restaurante}`)
```json
{
  "restaurantName": "Nombre Actualizado",
  "restaurantAddress": "Direccion Actualizada",
  "restaurantSchedule": "Horario Actualizado",
  "restaurantCategory": "Categoria Actualizada",
  "averagePrice": 0,
  "contact": {
    "phone": "0000-0000",
    "email": "exampleupdate@example.com"
  }
}
```

#### Desactivar restaurante (`/restaurants/{id_restaurante}`)
```json
{}
```

#### Crear Mesa (`/tables`)
```json
{
  "restaurant": "ID",
  "capacity": 0,
  "location": "Localizacion",
  "availableHours": [
    {
      "start": "00:00",
      "end": "00:00"
    }
  ]
}
```

#### Actualizar Mesa (`/tables/{id_tables}`)
```json
{
  "restaurant": "ID Actualizado",
  "capacity": 0,
  "location": "Localizacion Actualizada",
  "availableHours": [
    {
      "start": "00:00",
      "end": "00:00"
    }
  ]
}
```

#### Desactivar Mesa (`/tables/{id_tables}`)
```json
{}
```

#### Crear Menu (`/menu`)
```json
{
  "restaurant": "ID",
  "name": "Nombre",
  "description": "Descripcion",
  "ingredients": ["Ingrediente"],
  "price": 0,
  "type": "Tipo"
}
```

#### Actualizar Menu (`/menu/{id_menu}`)
```json
{
  "restaurant": "ID Actualizado",
  "name": "Nombre Actualizado",
  "description": "Descripcion Actualizada",
  "ingredients": ["Ingrediente Actualizado"],
  "price": 0,
  "type": "Tipo Actualizado"
}
```

#### Desactivar Menu (`/menu/{id_menu}`)
```json
{}
```

#### Crear Reservacion (`/reservations`)
```json
{
  "restaurantId": "ID",
  "tableId": "ID",
  "orderId": "ID",
  "customerName": "Nombre",
  "customerPhone": "0000-0000",
  "type": "Tipo",
  "date": "0000-00-00T00:00:00.000Z",
  "guests": 0,
  "status": "Estado",
  "notes": "Notas"
}
```

#### Actualizar Reservacion (`/reservations/{id_reserva}`)
```json
{
  "restaurantId": "ID Actualizado",
  "tableId": "ID Actualizado",
  "orderId": "ID Actualizado",
  "customerName": "Nombre Actualizado",
  "customerPhone": "0000-0000",
  "type": "Tipo Actualizado",
  "date": "0000-00-00T00:00:00.000Z",
  "guests": 0,
  "status": "Estado Actualizado",
  "notes": "Notas Actualizadas"
}
```

#### Desactivar Reservacion (`/reservations/{id_reserva}`)
```json
{}
```

#### Cancelar Reservacion (`/reservations/{id_reserva}/cancel`)
```json
{}
```

#### Visualizar Ordenes (`/orders/restaurant/{id_restaurant}`)
```json
{}
```

#### Crear Orden (`/orders`)
```json
{
  "restaurantId": "ID",
  "reservationId": "ID",
  "customerName": "Nombre",
  "items": [
    {
      "menuItemId": "ID",
      "name": "Nombre",
      "quantity": 0,
      "price": 00
    }
  ]
}
```

#### Actualizar Orden (`/orders/{id_orden}`)
```json
{
  "restaurantId": "ID",
  "reservationId": "ID",
  "customerName": "Nombre",
  "items": [
    {
      "menuItemId": "ID",
      "name": "Nombre",
      "quantity": 0,
      "price": 00
    }
  ]
}
```

#### Desactivar Orden (`/orders/{id_orden}`)
```json
{}
```

#### Visualizar Eventos (`/events/restaurant/{id_restaurante}`)
```json
{}
```

#### Crear Evento (`/events`)
```json
{
  "restaurantId": "ID",
  "title": "Titulo",
  "description": "Descripcion",
  "eventType": "Tipo",
  "eventDate": "0000-00-00T00:00:00.000Z",
  "resources": {
    "music": "Música",
    "decoration": "Decoración",
    "extraStaffNeeded": 0,
    "specialMenu": [
      "ID",
      "ID"
    ]
  }
}
```

#### Actualizar Evento (`/events/{id_evento}`)
```json
{
  "restaurantId": "ID Actualizado",
  "title": "Titulo Actualizado",
  "description": "Descripcion Actualizada",
  "eventType": "Tipo Actualizado",
  "eventDate": "0000-00-00T00:00:00.000Z",
  "resources": {
    "music": "Música Actualizada",
    "decoration": "Decoración Actualizada",
    "extraStaffNeeded": 0,
    "specialMenu": [
      "ID Actualizado",
      "ID Actualizado"
    ]
  }
}
```

#### Desactivar Evento (`/events/{id_evento}`)
```json
{}
```

---

## 📁 Estructura del Proyecto

```
auth-service/
├── src/
│   ├── AuthService.Api/              # Capa de presentación
│   │   ├── Controllers/              # Controladores REST
│   │   ├── Extensions/               # Configuraciones y extensiones
│   │   ├── Middlewares/              # Middlewares personalizados
│   │   ├── ModelBinders/             # Model binders personalizados
│   │   ├── Models/                   # Modelos de API
│   │   └── Program.cs                # Punto de entrada
│   │
│   ├── AuthService.Application/      # Capa de aplicación
│   │   ├── DTOs/                     # Data Transfer Objects
│   │   ├── Exceptions/               # Excepciones personalizadas
|   |   ├── Extensions/               # Configuraciones y extensiones
│   │   ├── Interfaces/               # Interfaces de servicios
│   │   ├── Services/                 # Implementación de servicios
│   │   └── Validators/               # Validadores FluentValidation
│   │
│   ├── AuthService.Domain/           # Capa de dominio
│   │   ├── Constants/                # Constantes del dominio
│   │   ├── Entities/                 # Entidades del dominio
│   │   ├── Enums/                    # Enumeraciones
│   │   └── Interfaces/               # Interfaces de repositorios
│   │
│   └── AuthService.Persistence/      # Capa de persistencia
│       ├── Data/                     # DbContext y configuraciones
│       ├── Migrations/               # Migraciones de EF Core
│       └── Repositories/             # Implementación de repositorios
│
├── AuthService.sln                   # Solución de Visual Studio
├── global.json                       # Versión de .NET
└── .gitignore
```

---

```
event-service/
├── configs/
│   ├── app.js                          # Configuración principal del servidor
|   ├── configuration.js                # Configuración general
│   ├── db.js                           # Conexión a MongoDB
|   ├── helmets.js                      # Configuración de Helmet
|   └── rateLimit.js                    # Limitar las peticiones
│
├── middlewares/
│   ├── check-validators.js             # Validar peticiones
│   ├── handle-errors.js                # Manejo global de errores
│   ├── validate-event.js               # Validación de modelo
|   └── validate-JWT                    # Validación de token
│
├── src/
│   ├── event.controller.js             # Controlador
│   ├── event.model.js                  # Modelo de datos
│   ├── event.routes.js                 # Rutas
│   └── event.service.js                # Lógica de negocio
├── index.js                            # Punto de entrada
├── package.json                        # Dependencias y scripts
├── pnpm-lock.yaml                      # Lock file de pnpm
└── README.md
```
---

```
reservations-service/
├── configs/
│   ├── app.js                          # Configuración principal del servidor
|   ├── configuration.js                # Configuración general
│   ├── db.js                           # Conexión a MongoDB
|   ├── helmets.js                      # Configuración de Helmet
|   └── rateLimit.js                    # Limitar las peticiones
│
├── middlewares/
│   ├── check-validators.js             # Validar peticiones
│   ├── handle-errors.js                # Manejo global de errores
│   ├── order-validator.js              # Validación de modelo
│   ├── reservation-validator.js        # Validación de modelo
|   └── validate-JWT                    # Validación de token
│
├── src/
│   ├── order.controller.js             # Controlador
│   ├── order.model.js                  # Modelo de datos
│   ├── order.routes.js                 # Rutas
│   ├── order.service.js                # Lógica de negocio
│   ├── reservation.controller.js       # Controlador
│   ├── reservation.model.js            # Modelo de datos
│   ├── reservation.routes.js           # Rutas
│   └── reservation.service.js          # Lógica de negocio
├── index.js                            # Punto de entrada
├── package.json                        # Dependencias y scripts
├── pnpm-lock.yaml                      # Lock file de pnpm
└── README.md
```

---

```
restaurant-service/
├── configs/
│   ├── app.js                          # Configuración principal del servidor
│   ├── cloudinary.js                   # Configuración de cloudinary
|   ├── configuration.js                # Configuración general
│   ├── db.js                           # Conexión a MongoDB
|   ├── helmets.js                      # Configuración de Helmet
|   └── rateLimit.js                    # Limitar las peticiones
│
├── middlewares/
│   ├── check-validators.js             # Validación general
│   ├── delete-errors.js                # Validación de errores cloudinary
│   ├── file-uploader.js                # Validación de actualización cloudinary
│   ├── handle-errors.js                # Manejo global de errores
│   ├── menu-validator.js               # Validación de modelo
│   ├── restaurant-validator.js         # Validación de modelo
│   ├── table-validator.js              # Validación de modelo
|   └── validate-JWT                    # Validación de token
│
├── src/
│   ├── menu.controller.js              # Controlador
│   ├── menu.model.js                   # Modelo de datos
│   ├── menu.routes.js                  # Rutas
│   ├── menu.service.js                 # Lógica de negocio
│   ├── restaurant.controller.js        # Controlador
│   ├── restaurant.model.js             # Modelo de datos
│   ├── restaurant.routes.js            # Rutas
│   ├── restaurant.service.js           # Lógica de negocio
│   ├── table.controller.js             # Controlador
│   ├── table.model.js                  # Modelo de datos
│   ├── table.routes.js                 # Rutas
│   └── table.service.js                # Lógica de negocio
├── index.js                            # Punto de entrada
├── package.json                        # Dependencias y scripts
├── pnpm-lock.yaml                      # Lock file de pnpm
└── README.md
```

---

### Requisitos Previos
- .NET 8.0 SDK
- PostgreSQL 13+
- Cuenta de Gmail con App Password (para emails)
- Node.js 22+
- pnpm 10+ (Package Manager)
- 16 GB de ram

---

### Variables de Entorno

#### event-services

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=3022

URI_MONGODB=mongodb://localhost:27017/heaven-flavor

JWT_SECRET=$ecretKeyForHFl@avor
JWT_EXPIRES_IN=1h
JWT_USSUER=HeavenFlavor
JWT_AUDIENCE=HeavenFlavor

NODE_TLS_REJECT_UNAUTHORIZED=0
```
---

#### restaurant-services

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=3021

URI_MONGODB=mongodb://localhost:27017/heaven-flavor

CLOUDINARY_CLOUD_NAME=dsbibfrfc
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_BASE_FOLDER=https://res.cloudinary.com/dsbibfrfc/image/upload/Heaven_flavor
CLOUDINARY_DEFAULT_AVATAR_NAME=restaurant_uur74f.jpg

JWT_SECRET=$ecretKeyForHFl@avor
JWT_EXPIRES_IN=1h
JWT_USSUER=HeavenFlavor
JWT_AUDIENCE=HeavenFlavor

NODE_TLS_REJECT_UNAUTHORIZED=0
```
---

#### reservations-services

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=3023

URI_MONGODB=mongodb://localhost:27017/heaven-flavor

JWT_SECRET=$ecretKeyForHFl@avor
JWT_EXPIRES_IN=1h
JWT_USSUER=HeavenFlavor
JWT_AUDIENCE=HeavenFlavor

NODE_TLS_REJECT_UNAUTHORIZED=0
```

---

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulte el archivo [LICENSE](LICENSE) para más detalles.

## Autor

**Programming Team**  
Curso IN6AV - Kinal Guatemala 2026

## Próximas Actualizaciones
> Este archivo README.md se actualizará periódicamente a medida que el Programming Team avance en los hitos del proyecto. Las nuevas funcionalidades se documentarán conforme se integren a la rama principal.