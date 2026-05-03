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
      title: "Heaven Flavor - Restaurant Service",
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
        description: "Servidor Local"
      },
    ],
    components: {
      schemas: {
        Restaurant: {
          type: "object",
          properties: {
            restaurantName: { type: "string", example: "La Casa del Sabor" },
            restaurantAddress: { type: "string", example: "Zona 1, Ciudad de Guatemala" },
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
            isAvailable: { type: "boolean", default: true },
            isActive: { type: "boolean", default: true },
            photos: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  url: { type: "string" },
                  public_id: { type: "string" }
                }
              }
            }
          },
        },
        Table: {
          type: "object",
          properties: {
            restaurant: { type: "string", example: "645a1b2c3d4e5f6g7h8i9j0k" },
            capacity: { type: "integer", example: 4 },
            location: { type: "string", example: "Terraza" },
            availableHours: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  start: { 
                    type: "string", 
                    pattern: "^([01]\\d|2[0-3]):?([0-5]\\d)$",
                    example: "08:00"
                  },
                  end: { 
                    type: "string", 
                    pattern: "^([01]\\d|2[0-3]):?([0-5]\\d)$",
                    example: "12:00",
                  },
                },
              },
            },
            isAvailable: { type: "boolean", default: true },
            isActive: { type: "boolean", default: true }
          },
        },
        Menu: {
          type: "object",
          properties: {
            restaurant: { type: "string", example: "645a1b2c3d4e5f6g7h8i9j0k" },
            name: { type: "string", example: "Pepián de Pollo" },
            description: { type: "string", example: "Platillo tradicional con recado de especias tostadas." },
            ingredients: {
              type: "array",
              items: { type: "string" },
              example: ["Pollo", "Chile pasa", "Pepitoria", "Ajonjolí"],
            },
            price: { type: "number", example: 45.5 },
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
              example: "plato fuerte",
            },
            isAvailable: { type: "boolean", default: true },
            isActive: { type: "boolean", default: true }
          },
        },
      },
    },
    tags: [
      { name: "Restaurant", description: "Gestión de información del restaurante", },
      { name: "Table", description: "Gestión de mesas y disponibilidad" },
      { name: "Menu", description: "Gestión de platillos y precios" },
    ],
  },
  apis: [
    "./src/Routes/*.js",          
    "./src/Routes/**/*.js",       
    "./app.js"  
  ],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export { swaggerDocs, swaggerUi };
