import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Heaven Flavor - Reservations Service",
      version: "1.0.0",
      description:
        "Documentación de los servicios de reservaciones para el sistema de Restaurantes",
      contact: {
        name: "Programming Team",
        email: "programingteam70@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3023",
        description: "Servidor local de Reservaciones",
      },
    ],
    components: {
      schemas: {
        Order: {
          type: "object",
          properties: {
            restaurantId: {
              type: "string",
              example: "67c5a8c2f3a1c3e21c9d1123",
            },
            reservationId: {
              type: "string",
              example: "67c5a8c2f3a1c3e21c9d1150",
            },
            customerName: {
              type: "string",
              minLength: 3,
              maxLength: 200,
              example: "Juan Pérez",
            },
            items: {
              type: "array",
              minItems: 1,
              items: { $ref: "#/components/schemas/OrderItem" },
            },
            total: {
              type: "number",
              example: 90.00,
            },
            status: {
              type: "string",
              enum: ["en preparación", "listo", "entregado", "cancelado"],
              default: "en preparación",
            },
            isActive: { type: "boolean", default: true },
            isAvalible: { type: "boolean", default: true },
          },
        },
        OrderItem: {
          type: "object",
          properties: {
            menuItemId: {
              type: "string",
              example: "67c5a8c2f3a1c3e21c9d1200",
            },
            quantity: {
              type: "integer",
              minimum: 1,
              example: 2,
            },
            price: {
              type: "number",
              minimum: 0,
              example: 45.00,
            },
            subtotal: {
              type: "number",
              example: 90.00,
            },
          },
        },
        Reservation: {
          type: "object",
          properties: {
            restaurantId: {
              type: "string",
              example: "67c5a8c2f3a1c3e21c9d1123",
            },
            tableId: {
              type: "string",
              example: "67c5a8c2f3a1c3e21c9d1140",
            },
            customerName: {
              type: "string",
              minLength: 3,
              maxLength: 200,
              example: "Juan Pérez",
            },
            customerPhone: {
              type: "string",
              pattern: "^\\d{8}$",
              example: "55512345",
            },
            type: {
              type: "string",
              enum: ["mesa", "domicilio", "para llevar"],
              example: "mesa",
            },
            date: {
              type: "string",
              format: "date-time",
              example: "2026-05-10T19:00:00.000Z",
            },
            guests: {
              type: "integer",
              minimum: 1,
              maximum: 50,
              default: 1,
              example: 4,
            },
            status: {
              type: "string",
              enum: ["pendiente", "confirmada", "en curso", "completada", "cancelada"],
              default: "pendiente",
            },
            notes: {
              type: "string",
              maxLength: 500,
              example: "Cerca de la ventana, por favor.",
            },
            isActive: { type: "boolean", default: true },
            isAvalible: { type: "boolean", default: true },
          },
        },
      },
    },
    tags: [
      { name: "Reservations", description: "Endpoints para la gestión de reservas de mesas y clientes" },
      { name: "Order", description: "Gestión de órdenes y pedidos" },
    ],
  },
  apis: [
    "./src/Router/*.js",          
    "./src/Router/**/*.js",       
    "./app.js"  
  ],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export { swaggerDocs, swaggerUi };
