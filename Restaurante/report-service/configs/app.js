"use strict";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import { dbConnection } from "./db.js";
import { options } from "./configuration.js";
import { helmets } from "./helmets.js";
import { requestLimit } from "./rateLimit.js";
import reportRoutes from "../src/routes/report.routes.js";
import statisticsRoutes from "../src/routes/statistics.routes.js";

const BASE_PATH = "/heaven-flavor/even";

const middlewares = (app) => {
  app.use(express.urlencoded({ extended: false, limit: "10mb" }));
  app.use(express.json({ limit: "10mb" }));
  app.use(cors(options));
  app.use(morgan("dev"));
  app.use(helmet(helmets));
  app.use(requestLimit);
  app.use(
      "/uploads",
      express.static(
          path.join(process.cwd(), "uploads")
      )
  );
};

const routes = (app) => {
  app.use(`${BASE_PATH}/reports`, reportRoutes);
  app.use(`${BASE_PATH}/statistics`, statisticsRoutes);
  app.get(`${BASE_PATH}/health`, (reg, res) => {
    res.status(200).json({
      status: "Conectado.",
      service: "Heaven Flavor: Event Service.",
    });
  });
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: "Heaven Flavor: Ruta no existente.",
    });
  });
  app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(err.statusCode || 500).json({
          success: false,
          message: err.message || "Error interno del servidor",
      });
  });
};

export const initServer = async () => {
  const app = express();
  const PORT = process.env.PORT;
  app.set("trust proxy", 1);
  try {
    middlewares(app);
    await dbConnection();
    routes(app);
    app.listen(PORT, () => {
      console.log(`Heaven Flavor: Ejecutando en el puerto: ${PORT}`);
      console.log(`Conectado http://localhost:${PORT}${BASE_PATH}/health`);
    });
  } catch (error) {
    console.error(`Heaven Flavor: Error al iniciar el servidor: ${error.message}`);
    process.exit(1);
  }
};