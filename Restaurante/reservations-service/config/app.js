'use strict'

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { dbConnection } from './db.js';
import { corsOptions } from './cors.configuration.js';
import { helmetOptions } from './helmet.configuration.js';
import { requestLimit } from './rateLimit.configuration.js';
import orderRoutes from '../src/order.routes.js'
import reservationsRoutes from '../src/reservation.routes.js'

const BASE_PATH = '/Heaven Flavor/reser';

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false, limit: '10mb'}));
    app.use(express.json({limit: '10mb'}));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
    app.use(helmet(helmetOptions));
    app.use(requestLimit);
};

const routes = (app) => {
    app.use(`${BASE_PATH}/fields`, orderRoutes);
    app.use(`${BASE_PATH}/fields`, reservationsRoutes);
    app.get(`${BASE_PATH}/health`, (reg, res) => {
        res.status(200).json({
            status: 'healthy',
            service: 'Heaven Flavor: Reservations Service.'
        })
    })

    app.use((req, res) => {
        res.status(404).json({
            succes: false,
            massage: 'Ruta no existente.'
        })
    })
}

export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT;
    app.set('trus proxy', 1);

    try {
        middlewares(app);
        await dbConnection();
        routes(app);
        app.listen(PORT, () => {
            console.log(`Heaven Flavor se esta ejecutando en el puerto: ${PORT}`);
            console.log(`Health http://localhost:${PORT}${BASE_PATH}/health`);
        });
    } catch (error) {
        console.error(`Error al iniciar el servidor: ${error.mensaje}`);
        process.exit(1);
    }
}