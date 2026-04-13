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
      title: "Reservations Service",
      version: "1.0.0",
      description:
        "Documentación de los servicios de reservaciones para el sistema de Restaurantes",
      contact: {
        name: "Programming Team",
        email: "programingteam70@gmail.com",
      },
    },
    components: {
      schemas: {
        Ord: {
          type: "object",
          properties: {
            status: {
              type: "enum",
              description:
                "Estado (en preparación, listo, entregado, cancelado)",
              example: "listo",
            },
          },
        },
        Order: {
          type: "object",
          properties: {
            restaurantId: {
              type: "string",
              description: "ID del restaurante asociado",
              example: "67c5a8c2f3a1c3e21c9d1123",
            },
            reservationId: {
              type: "string",
              description: "ID de la reservación vinculada a la orden",
              example: "67c5a8c2f3a1c3e21c9d1150",
            },
            customerName: {
              type: "string",
              description: "Nombre del cliente que realiza el pedido",
              example: "Juan Pérez",
            },
            items: {
              type: "array",
              items: {
                $ref: "#/components/schemas/OrderItem",
              },
            },
          },
        },
        OrderItem: {
          type: "object",
          properties: {
            menuItemId: {
              type: "string",
              description: "ID del platillo o bebida",
              example: "67c5a8c2f3a1c3e21c9d1200",
            },
            name: {
              type: "string",
              description: "Nombre del producto",
              example: "Pizza Margarita",
            },
            quantity: {
              type: "integer",
              description: "Cantidad solicitada",
              example: 2,
            },
            price: {
              type: "number",
              description: "Precio unitario",
              example: 45,
            },
          },
        },
        Reservation: {
          type: "object",
          properties: {
            restaurantId: {
              type: "string",
              description: "ID del restaurante",
              example: "67c5a8c2f3a1c3e21c9d1123",
            },
            tableId: {
              type: "string",
              description: "ID de la mesa asignada",
              example: "67c5a8c2f3a1c3e21c9d1140",
            },
            orderId: {
              type: "string",
              description: "ID de la orden asociada a la reserva",
              example: "67c5a8c2f3a1c3e21c9d1150",
            },
            customerName: {
              type: "string",
              example: "Juan Pérez",
            },
            customerPhone: {
              type: "string",
              example: "55512345",
            },
            type: {
              type: "string",
              description: "Tipo de reserva (mesa, evento, etc.)",
              example: "mesa",
            },
            date: {
              type: "string",
              format: "date-time",
              description: "Fecha y hora de la reserva en formato ISO",
              example: "2026-03-05T19:00:00.000Z",
            },
            guests: {
              type: "integer",
              description: "Número de comensales",
              example: 4,
            },
            status: {
              type: "string",
              enum: ["pendiente", "confirmada", "cancelada"],
              example: "confirmada",
            },
            notes: {
              type: "string",
              description: "Observaciones adicionales",
              example: "Mesa cerca de la ventana",
            },
          },
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3023",
        description: "Servidor local de Reservaciones",
      },
    ],
    tags: [
      {
        name: "Reservations",
        description:
          "Endpoints para la gestión de reservas de mesas y clientes",
      },
    ],
  },
  apis: [
    path.join(__dirname, "../src/*.js"),
    path.join(__dirname, "./src/*.js"),
  ],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export { swaggerDocs, swaggerUi };
