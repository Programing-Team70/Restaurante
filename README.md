# Heaven Flavor - Sistema de Gestión de Restaurantes
> **Nota**: Este proyecto ha sido desarrollado por el equipo de desarrollo Programming Team utilizando como base técnica y educativa la arquitectura de microservicios y las mejores prácticas de desarrollo web proporcionada por el Catedrático Braulio Echeverría (PEM) del curso IN6AV, Kinal Guatemala 2026.

## Descripción:
Este repositorio contiene el núcleo central de Heaven Flavor, una plataforma integral diseñada para la digitalización de la experiencia gastronómica. El sistema actúa como un ecosistema unificado que conecta a clientes, restauranteros y administradores, permitiendo desde la reserva de mesas hasta la analítica avanzada de ventas, todo bajo una arquitectura escalable, segura y de alta disponibilidad.

---

# Funcionalidades Principales

### 1. Gestión de Identidad y Acceso (Authentication)
* **Registro Multiperfil:** Registro para Trabajadores del Restaurante con validación de credenciales.
* **Autenticación Segura:** Inicio de sesión para Trabajadores del Restaurante protegido mediante hashing de contraseñas.
* **Perfil de Usuario:** Gestión completa del perfil de usuario para Trabajadores del Restaurante.

### 2. Gestión de Restaurantes, Mesas y Menús (Restaurant)
* **Gestión de Restaurantes:** Gestión detallada de restaurantes incluyendo nombre, ubicación geográfica, horarios, categorías, precios, información de contacto y galerías fotográficas.
* **Gestión de Mesas:** Gestión detallada de mesas incluyendo la capacidad, ubicación y estados de disponibilidad en tiempo real.
* **Ingeniería de Menús:** Gestión detallada de platillos del menú incluyendo nombre, descripción, ingredientes que lo conforman, precio y tipo de platillo.

### 3. Gestión de Reservaciones y Pedidos (Reservation)
* **Gestión de Reservaciones:** Gestión detallada de reservaciones incluyendo nombre y número de teléfono del cliente, tipo de reservación, fecha, invitados, estado y notas adicionales.
* **Gestión de Pedidos:** Gestión detallada de pedidos incluyendo nombre del cliente, platillos pedidos, el total del pedido y estados de disponibilidad en tiempo real.

### 4. Gestión de Eventos (Event)
* **Gestión de Reservaciones:** Gestión detallada de eventos incluyendo titulo del evento, descripción general, tipo de eventos, fecha, capacidad, estado, decoración del evento y notas adicionales.

---

# 🛠️ Tecnologías Utilizadas
- Componente Tecnología
- Runtime	Node.js y .Net
- Lenguaje JavaScript / C#
- PostgreSQL/MongoDB
- Documentación	Postman
- React (Vite)
- Recharts

---

# 🔌 Endpoints

## Endpoints API (Authentication-Services)

Base URL: `http://localhost:5210/heaven-flavor/auth`

| Método | Ruta | Descripción | 
|-|-|-|
| `GET` | `/profile` | Obtener perfil |
| `POST` | `/login` | Iniciar sesión |
| `PUT` | `/register` | Agregar cuenta |

---

## Endpoints API (restaurant-services)

Base URL: `http://localhost:3021/heaven-flavor/rest`

### Restaurante (`/restaurant`)

| Método | Ruta | Descripción | 
|-|-|-|
| `GET` | `/restaurant` | Obtener Restaurantes |
| `POST` | `/restaurant` | Agregar restaurante |
| `PUT` | `/restaurant/{id}` | Actualizar restaurante |
| `DEL` | `/restaurant/{id}` | Desactivar restaurante |

### Mesa (`/table`)

| Método | Ruta | Descripción | 
|-|-|-|
| `GET` | `/table/{id}` | Obtener Mesa |
| `GET` | `/table/restaurant/{id_restaurant}` | Obtener Mesas por Restaurante |
| `POST` | `/table` | Agregar mesa |
| `PUT` | `/table/{id}` | Actualizar mesa |
| `DEL` | `/table/{id}` | Desactivar mesa |

### Menú (`/menu`)

| Método | Ruta | Descripción | 
|-|-|-|
| `GET` | `/menu/{id}` | Obtener platillo |
| `GET` | `/menu/restaurant/{id_restaurant}` | Obtener platillos por Restaurante |
| `POST` | `/menu` | Agregar platillo |
| `PUT` | `/menu/{id}` | Actualizar platillo |
| `DEL` | `/menu/{id}` | Desactivar platillo |

---

## Endpoints API (reservation-services)

Base URL: `http://localhost:3023/heaven-flavor/reser`

### Reservación (`/reservations`)

| Método | Ruta | Descripción | 
|-|-|-|
| `GET` | `/reservation` | Obtener reservaciones |
| `GET` | `/reservation/restaurant/{id_restaurant}` | Obtener reservaciones por Restaurante |
| `POST` | `/reservation` | Agregar reservación |
| `PUT` | `/reservation/{id}` | Actualizar reservación |
| `DEL` | `/reservation/{id}` | Desactivar reservación |
| `PATCH` | `/reservation/{id}/cancel` | Cancelar reservación |

### Orden (`/order`)

| Método | Ruta | Descripción | 
|-|-|-|
| `GET` | `/order` | Obtener ordenes |
| `GET` | `/order/restaurant/{id_restaurant}` | Obtener ordenes por Restaurante |
| `POST` | `/order` | Agregar orden |
| `PUT` | `/order/{id}` | Actualizar orden |
| `DEL` | `/order/{id}` | Desactivar orden |

---

## Endpoints API (event-services)

Base URL: `http://localhost:3022/heaven-flavor/even`

### Event (`/event`)

| Método | Ruta | Descripción | 
|-|-|-|
| `GET` | `/event` | Obtener eventos |
| `GET` | `/event/restaurant/{id_restaurant}` | Obtener eventos por Restaurante |
| `POST` | `/event` | Agregar evento |
| `PUT` | `/event/{id_evento}` | Actualizar evento |
| `DEL` | `/event/{id_evento}` | Desactivar evento |
| `PATCH` | `/event/{id}/cancel` | Cancelar evento |

---

## Endpoints API (report-services)

Base URL: `http://localhost:3024/heaven-flavor/even`

### Report (`/reports`)

| Método | Ruta | Descripción | 
|-|-|-|
| `GET`  | `/reports` | Obtener reportes |
| `GET`  | `/reports/{id}` | Obtener reporte por ID|
| `POST` | `/reports` | Crear reporte |
| `DEL`  | `/reports/{id}` | Eliminar reporte    |

### Statistics (`/statistics`)

| Método | Ruta | Descripción | 
|-|-|-|
| `GET`  | `/statistics` | Obtener estadísticas |
| `POST` | `/statistics` | Crear estadística |
| `PUT`  | `/statistics/{id}` | Actualizar estadística |
| `DEL`  | `/statistics/{id}` | Eliminar estadística |

---

# 📦 Modelos Request

## Modulo de Autentificación (Authentication-Services)

### Obtener Perfil (`/auth/profile`)
```json
{}
```

### Agregar Cuenta (`/auth/register`)
```json
{
    "Name": "Nombre",
    "Surname": "Apellido",
    "Email": "correo@gmial.com",
    "Password": "Contraseña"
}
```

### Iniciar Sesión (`/auth/login`)
```json
{
    "Email": "correo@gmial.com",
    "Password": "Contraseña"
}
```

---

## Modulo de Restaurante (restaurant-service)

### Obtener restaurantes (`/restaurant`)
| Key | Type | Value | 
|-|-|-|
| | | |

### Crear restaurante (`/restaurant`)

| Key | Type | Value | 
|-|-|-|
| restaurantName | Text | Nombre |
| restaurantAddress | Text | Dirección |
| restaurantSchedule | Text | Horario |
| restaurantCategory | Text | Categoria |
| averagePrice | Text | 10.00 |
| contact.phone | Text | 8765 4321 |
| contact.email | Text | correo@hflavor.com |
| images | File | restaurant.png |

### Actualizar restaurante (`/restaurant/{id}`)

| Key | Type | Value | 
|-|-|-|
| restaurantName | Text | Nombre |
| restaurantAddress | Text | Dirección |
| restaurantSchedule | Text | Horario |
| restaurantCategory | Text | Categoria |
| averagePrice | Text | 10.00 |
| contact.phone | Text | 8765 4321 |
| contact.email | Text | correo@hflavor.com |
| isAvailable | Text | true |
| isActive | Text | true |
| images | File | restaurant.png |

### Desactivar restaurante (`/restaurant/{id}`)
| Key | Type | Value | 
|-|-|-|
| | | |

---

## Modulo de Mesa

### Obtener mesa (`/table/{id}`)
```json
{}
```

### Obtener mesas por restaurante(`/table/restaurant/{id_restaurant}`)
```json
{}
```

### Crear mesa (`/table`)
```json
{
  "restaurant": "qwertyuioplkjhgfdsazxcvb",
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

### Actualizar mesa (`/table/{id}`)
```json
{
  "capacity": 0,
  "location": "Localizacion Actualizada",
  "availableHours": [
    {
      "start": "00:00",
      "end": "00:00"
    }
  ],
  "isAvailable": false,
  "isActive": false
}
```

### Desactivar mesa (`/table/{id}`)
```json
{}
```

---

## Modulo de Menu 

### Obtener menu (`/menu/{id}`)
```json
{}
```

### Obtener menu por restaurante (`/menu/restaurant/{id_restaurant}`)
```json
{}
```

### Crear menu (`/menu`)
```json
{
  "restaurant": "qwertyuioplkjhgfdsazxcvb",
  "name": "Nombre",
  "description": "Descripcion",
  "ingredients": ["Ingrediente1", "Ingrediente2"],
  "price": 10.00,
  "type": "plato fuerte"
}
```

### Actualizar menu (`/menu/{id}`)
```json
{
  "name": "Nombre",
  "description": "Descripcion",
  "ingredients": ["Ingrediente1", "Ingrediente2"],
  "price": 10.00,
  "type": "plato fuerte",
  "isAvailable": false,
  "isActive": false
}
```

### Desactivar menu (`/menu/{id}`)
```json
{}
```

---

## Modulo de Reservaciones

### Obtener reservaciones (`/reservation`)
```json
{}
```

### Crear reservacion (`/reservation`)
```json
{
  "restaurantId": "qwertyuioplkjhgfdsazxcvb",
  "tableId": "bvcxzasdfghjklpoiuytrewq",
  "customerName": "Nombre del cliente",
  "customerPhone": "0000 0000",
  "type": "mesa",
  "date": "2026-01-01T00:00:00.000Z",
  "guests": 1,
  "status": "confirmada",
  "notes": "Notas"
}
```

### Actualizar reservacion (`/reservation/{id}`)
```json
{
  "customerName": "Nombre del cliente",
  "customerPhone": "0000 0000",
  "type": "mesa",
  "date": "2026-01-01T00:00:00.000Z",
  "guests": 1,
  "status": "confirmada",
  "notes": "Notas"
  "isAvailable": false,
  "isActive": false
}
```

### Desactivar reservacion (`/reservation/{id}`)
```json
{}
```

### Cancelar reservacion (`/reservation/{id}/cancel`)
```json
{}
```

---

## Modulo de Ordenes

### Obtener ordenes (`/order`)
```json
{}
```

### Obtener orden por restaurante (`/order/restaurant/{id_restaurant}`)
```json
{}
```

### Crear orden (`/order`)
```json
{
  "restaurantId": "qwertyuioplkjhgfdsazxcvb",
  "reservationId": "bvcxzasdfghjklpoiuytrewq",
  "customerName": "Nombre del cliente",
  "items": [
    {
      "menuItemId": "qwertyuiopasdfghjklzxcvb",
      "quantity": 1,
      "price": 10.00
    },
    {
      "menuItemId": "qwertyuiopasdfghjklzxcvb",
      "quantity": 1,
      "price": 10.00
    }
  ]
}
```

### Actualizar orden (`/order/{id}`)
```json
{
  "restaurantId": "qwertyuioplkjhgfdsazxcvb",
  "reservationId": "bvcxzasdfghjklpoiuytrewq",
  "customerName": "Nombre del cliente",
  "items": [
    {
      "menuItemId": "qwertyuiopasdfghjklzxcvb",
      "quantity": 1,
      "price": 10.00
    },
    {
      "menuItemId": "qwertyuiopasdfghjklzxcvb",
      "quantity": 1,
      "price": 10.00
    }
  ],
  "isAvailable": false,
  "isActive": false
}
```

### Desactivar orden (`/order/{id}`)
```json
{}
```

---

## Modulo de Eventos

### Obtener eventos (`/event`)
```json
{}
```

### Obtener eventos por restaurante (`/event/restaurant/{id_restaurant}`)
```json
{}
```

### Crear evento (`/event`)
```json
{
  "restaurantId": "qwertyuioplkjhgfdsazxcvb",
  "title": "Titulo",
  "description": "Descripcion",
  "eventType": "cena tematica",
  "eventDate": "2026-01-01T00:00:00.000Z",
  "resources": {
    "music": "Música",
    "decoration": "Decoración",
    "extraStaffNeeded": 1,
    "specialMenu": [
      "bvcxzasdfghjklpoiuytrewq",
      "qwertyuiopasdfghjklzxcvb"
    ]
  }
}
```

### Actualizar evento (`/event/{id_evento}`)
```json
{
  "title": "Titulo",
  "description": "Descripcion",
  "eventType": "cena tematica",
  "eventDate": "2026-01-01T00:00:00.000Z",
  "resources": {
    "music": "Música",
    "decoration": "Decoración",
    "extraStaffNeeded": 1,
    "specialMenu": [
      "bvcxzasdfghjklpoiuytrewq",
      "qwertyuiopasdfghjklzxcvb"
    ]
  }
  "isAvailable": false,
  "isActive": false
}
```

### Desactivar evento (`/event/{id}`)
```json
{}
```

### Cancelar evento (`/event/{id}/cancel`)
```json
{}
```

---

## Modulo de Reporte (report-service)

### Obtener reportes (`/reports`)
```json
{}
```

### Obtener reporte (`/reports/{id}`)
```json
{}
```

### Crear reporte (`/reports`)
```json
{
  "restaurantId": "qwertyuioplkjhgfdsazxcvb",
  "title": "titulo",
  "reportType": "demanda",
  "startDate": "2026-01-01T00:00:00.000Z",
  "endDate": "2026-02-01T00:00:00.000Z",
  "format": "pdf"
}
```

### Desactivar reporte (`/reports/{id}`)
```json
{}
```

---

## Modulo de Estadística (report-service)

### Obtener Estadísticas (`/statistics`)
```json
{}
```

### Crear Estadística (`/statistics`)
```json
{
  "restaurantId": "bvcxzasdfghjklpoiuytrewq",
  "metric": "Ventas",
  "value": 0,
  "date": "2026-01-01T00:00:00.000Z"
}
```

### Actualizar Estadística (`/statistics/{id}`)
```json
{
  "metric": "Ventas",
  "value": 0,
  "date": "2026-01-01T00:00:00.000Z",
  "isActive": false
}
```

### Desactivar Estadística (`/statistics/{id}`)
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

```
restaurant-service/
├── configs/
│   ├── app.js                          # Configuración principal del servidor
│   ├── cloudinary.js                   # Configuración de cloudinary
|   ├── configuration.js                # Configuración general
│   ├── db.js                           # Conexión a MongoDB
│   ├── documentation.js                # Docuemntación de Swagger
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
│
├── src/
│   ├── Controller
│       ├── menu.controller.js          # Controlador
│       ├── restaurant.controller.js    # Controlador
│       ├── table.controller.js         # Controlador
│   ├── Model
│       ├── menu.model.js               # Modelo de datos
│       ├── restaurant.model.js         # Modelo de datos
│       ├── table.model.js              # Modelo de datos
│   ├── Routes
│       ├── menu.routes.js              # Rutas
│       ├── restaurant.routes.js        # Rutas
│       ├── table.routes.js             # Rutas
│   ├── Services
│       ├── menu.service.js             # Lógica de negocio
│       ├── restaurant.service.js       # Lógica de negocio
│       └── table.service.js            # Lógica de negocio
├── .gitignore
├── index.js                            # Punto de entrada
├── package.json                        # Dependencias y scripts
├── pnpm-lock.yaml                      # Lock file de pnpm
└── README.md
```

```
reservations-service/
├── configs/
│   ├── app.js                          # Configuración principal del servidor
|   ├── configuration.js                # Configuración general
│   ├── db.js                           # Conexión a MongoDB
│   ├── documentation.js                # Docuemntación de Swagger
|   ├── helmets.js                      # Configuración de Helmet
|   └── rateLimit.js                    # Limitar las peticiones
│
├── middlewares/
│   ├── check-validators.js             # Validar peticiones
│   ├── handle-errors.js                # Manejo global de errores
│   ├── order-validator.js              # Validación de modelo
│   ├── reservation-validator.js        # Validación de modelo
│
├── src/
│   ├── Controller
│       ├── order.controller.js         # Controlador
│       ├── reservation.controller.js   # Controlador
│   ├── Model
│       ├── order.model.js              # Modelo de datos
│       ├── reservation.model.js        # Modelo de datos
│   ├── Routes
│       ├── order.routes.js             # Rutas
│       ├── reservation.routes.js       # Rutas
│   ├── Services
│       ├── order.service.js            # Lógica de negocio
│       ├── reservation.service.js      # Lógica de negocio
├── .gitignore
├── index.js                            # Punto de entrada
├── package.json                        # Dependencias y scripts
├── pnpm-lock.yaml                      # Lock file de pnpm
└── README.md
```

```
event-service/
├── configs/
│   ├── app.js                          # Configuración principal del servidor
|   ├── configuration.js                # Configuración general
│   ├── db.js                           # Conexión a MongoDB
│   ├── documentation.js                # Docuemntación de Swagger
|   ├── helmets.js                      # Configuración de Helmet
|   └── rateLimit.js                    # Limitar las peticiones
│
├── middlewares/
│   ├── check-validators.js             # Validar peticiones
│   ├── event-validator.js              # Validación de modelo
│   ├── handle-errors.js                # Manejo global de errores
│
├── src/
│   ├── Controller
│       ├── event.controller.js         # Controlador
│   ├── Model
│       ├── event.model.js              # Modelo de datos
│   ├── Routes
│       ├── event.routes.js             # Rutas
│   ├── Services
│       ├── event.service.js            # Lógica de negocio
├── .gitignore
├── index.js                            # Punto de entrada
├── package.json                        # Dependencias y scripts
├── pnpm-lock.yaml                      # Lock file de pnpm
└── README.md
```

```
report-service/
├── configs/
│   ├── app.js                          # Configuración principal del servidor
│   ├── cloudinary.js                   # Configuración de cloudinary
│   ├── configuration.js                # Configuración general
│   ├── db.js                           # Conexión a MongoDB
│   ├── helmets.js                      # Configuración de Helmet
│   └── rateLimit.js                    # Limitar las peticiones
│
├── helpers/
│   ├── excel-generator.js              # Generar archivo excel
│   ├── pdf-generator.js                # Generar archivo pdf
│   ├── upload-file.js                  # Generar archivo descargable
│
├── middlewares/
│   ├── check-validators.js             # Validación general
│   ├── handle-errors.js                # Manejo global de errores
│   ├── validate-report.js              # Validación de reportes
│
├── src/
│   ├── Controller
│       ├── report.controller.js        # Controlador
│       ├── statistics.controller.js    # Controlador
│   ├── Model
│       ├── report.model.js             # Modelo de datos
│       ├── statistics.model.js         # Modelo de datos
│   ├── Routes
│       ├── report.routes.js            # Rutas
│       ├── statistics.routes.js        # Rutas
│   ├── Services
│       ├── report.service.js           # Lógica de negocio
│       ├── statistics.service.js       # Lógica de negocio
├── .gitignore
├── index.js                            # Punto de entrada
├── package.json                        # Dependencias y scripts
├── pnpm-lock.yaml                      # Lock file de pnpm
└── README.md
```

---

### 📋 Requisitos Previos
- .NET 8.0 SDK
- PostgreSQL 13+
- Cuenta de Gmail con App Password
- Node.js 22+
- pnpm 10+
- 16 GB de RAM

---

### 🔑 Variables de Entorno

### restaurant-service

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=3021

URI_MONGODB=mongodb://localhost:27017/heaven-flavor

CLOUDINARY_CLOUD_NAME=dsbibfrfc
CLOUDINARY_API_KEY=421535535627829
CLOUDINARY_API_SECRET=W_NWkBCJ9Vb1Q5TtHHIXxBY_HYU
CLOUDINARY_BASE_FOLDER=https://res.cloudinary.com/dsbibfrfc/image/upload/Heaven_flavor
CLOUDINARY_DEFAULT_AVATAR_NAME=restaurant_uur74f.jpg

NODE_TLS_REJECT_UNAUTHORIZED=0
```

### reservations-services

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=3023

URI_MONGODB=mongodb://localhost:27017/heaven-flavor

NODE_TLS_REJECT_UNAUTHORIZED=0
```

### event-service

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=3022

URI_MONGODB=mongodb://localhost:27017/heaven-flavor

NODE_TLS_REJECT_UNAUTHORIZED=0
```
### report-services

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=3024

URI_MONGODB=mongodb://localhost:27017/heaven-flavor

CLOUDINARY_CLOUD_NAME=dsbibfrfc
CLOUDINARY_API_KEY=421535535627829
CLOUDINARY_API_SECRET=W_NWkBCJ9Vb1Q5TtHHIXxBY_HYU
CLOUDINARY_BASE_FOLDER=https://res.cloudinary.com/dsbibfrfc/image/upload/Heaven_flavor
CLOUDINARY_DEFAULT_AVATAR_NAME=restaurant_uur74f.jpg

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
