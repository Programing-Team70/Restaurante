import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";
import { title } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Event Service",
      version: "1.0.0",
      description:
        "Documentación de los servicios de eventos para sistema de Restaurantes(Event Service)",
      contact: {
        name: "Programming Team",
        email: "programingteam70@gmail.com",
      },
    },
    components: {
      schemas: {
        event: {
          type: "object",
          properties: {
            restaurantId: {
              type: "string",
              description: "ID del restaurante asociado",
            },
            title: {
              type: "string",
              description: "Título del evento",
            },
            description: {
              type: "string",
              description: "Descripción detallada del evento",
            },
            eventType: {
              type: "string",
              description: "Tipo de evento (ej. cena temática, buffet)",
            },
            eventDate: {
              type: "string",
              format: "date-time",
              description: "Fecha y hora del evento en formato ISO",
            },
            resources: {
              type: "object",
              description: "Recursos y logística necesarios para el evento",
              properties: {
                music: {
                  type: "string",
                  description: "Tipo de música o entretenimiento",
                },
                decoration: {
                  type: "string",
                  description: "Estilo de decoración",
                },
                extraStaffNeeded: {
                  type: "integer",
                  description: "Cantidad de personal adicional requerido",
                },
                specialMenu: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description:
                    "Lista de IDs de los platillos del menú especial",
                },
              },
            },
          },
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3022",
      },
    ],
    tags: [
      {
        name: "Events",
        description:
          "Endpoints para la gestión de eventos y servicios de restaurante",
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
