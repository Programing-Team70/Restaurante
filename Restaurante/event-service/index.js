'use strict';

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { dbConnection } from "./config/db.js";

import eventRoutes from "./src/event.routes.js";

dotenv.config();

const app = express();

dbConnection();

app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "10kb" }));

app.use("/even/events", eventRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "API Eventos Gastronómicos funcionando correctamente",
        service: "Heaven Flavor: Event Service"
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Ruta ${req.originalUrl} no encontrada en el servicio de eventos`,
    });
});

app.use((err, req, res, next) => {
    console.error(`Error en Event Server: ${err.message}`);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Error interno del servidor",
    });
});

process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION en Event Service", err);
    process.exit(1);
});

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION en Event Service", err);
    process.exit(1);
});

const PORT = process.env.PORT || 3022;

app.listen(PORT, () => {
    console.log(`Event Service ejecutándose en el puerto: ${PORT}`);
    console.log(`Health Check: http://localhost:${PORT}/`);
});