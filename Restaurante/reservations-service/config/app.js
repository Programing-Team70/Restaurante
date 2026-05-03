'use strict'

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { dbConnection } from './db.js';
import { options } from './configuration.js';
import { helmets } from './helmet.js';
import { requestLimit } from './rateLimit.js';
import orderRoutes from '../src/Router/order.routes.js'
import reservationsRoutes from '../src/Router/reservation.routes.js'
import { swaggerDocs, swaggerUi } from "./documentation.js";

const BASE_PATH = '/heaven-flavor/reser';

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false, limit: '10mb'}));
    app.use(express.json({limit: '10mb'}));
    app.use(cors(options));
    app.use(morgan('dev'));
    app.use(helmet(helmets));
    app.use(requestLimit);
    app.use(`${BASE_PATH}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

const routes = (app) => {
    app.use(`${BASE_PATH}/order`, orderRoutes);
    app.use(`${BASE_PATH}/reservation`, reservationsRoutes);
    app.get(`${BASE_PATH}/health`, (reg, res) => {
        res.status(200).json({
            status: "Conectado.",
            service: "Heaven Flavor: Reservations Service.",
        })
    })
    app.use((req, res) => {
        res.status(404).json({
        succes: false,
        massage: "Heaven Flavor: Ruta no existente.",
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
            console.log(`Docs:  http://localhost:${PORT}${BASE_PATH}/api-docs`);
        });
    } catch (error) {
        console.error(`Heaven Flavor: Error al iniciar el servidor: ${error.message}`);
        process.exit(1);
    }
}