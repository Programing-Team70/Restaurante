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
      title: "Restaurant Service",
      version: "1.0.0",
      description:
        "Documentación de los servicios de gestión de Restaurantes, Mesas y Menús.",
      contact: {
        name: "Programming Team",
        email: "programingteam70@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3021",
      },
    ],
    components: {
      schemas: {
        Restaurant: {
          type: "object",
          properties: {
            restaurantName: { type: "string", example: "La Casa del Sabor" },
            restaurantAddress: {
              type: "string",
              example: "Zona 1, Ciudad de Guatemala",
            },
            restaurantSchedule: { type: "string", example: "08:00 - 22:00" },
            restaurantCategory: { type: "string", example: "Comida típica" },
            averagePrice: { type: "number", example: 75 },
            contact: {
              type: "object",
              properties: {
                phone: { type: "string", example: "5555-1234" },
                email: { type: "string", example: "contacto@casasabor.com" },
              },
            },
          },
        },
        Table: {
          type: "object",
          properties: {
            restaurant: { type: "string", description: "ID del restaurante" },
            capacity: { type: "integer", example: 4 },
            location: { type: "string", example: "Terraza" },
            availableHours: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  start: { type: "string", example: "08:00" },
                  end: { type: "string", example: "12:00" },
                },
              },
            },
          },
        },
        Menu: {
          type: "object",
          required: [
            "restaurant",
            "name",
            "description",
            "ingredients",
            "price",
            "type",
          ],
          properties: {
            restaurant: {
              type: "string",
              description: "ID del restaurante (ObjectId)",
            },
            name: {
              type: "string",
              maxLength: 200,
              description: "Nombre del platillo",
            },
            description: {
              type: "string",
              maxLength: 500,
              description: "Descripción detallada del platillo",
            },
            ingredients: {
              type: "array",
              items: { type: "string" },
              minItems: 1,
              description: "Lista de ingredientes",
            },
            price: {
              type: "number",
              minimum: 0,
              description: "Precio del platillo",
            },
            type: {
              type: "string",
              enum: [
                "entrada",
                "plato fuerte",
                "postre",
                "bebida",
                "acompañamiento",
                "combo",
                "otro",
              ],
              description: "Categoría del platillo",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Restaurant",
        description: "Gestión de información del restaurante",
      },
      { name: "Table", description: "Gestión de mesas y disponibilidad" },
      { name: "Menu", description: "Gestión de platillos y precios" },
    ],
  },
  apis: [
    path.join(__dirname, "../src/*.js"),
    path.join(__dirname, "./src/*.js"),
  ],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export { swaggerDocs, swaggerUi };
