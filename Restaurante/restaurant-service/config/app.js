'use strict'

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { dbConnection } from './db.js';
import { corsOptions } from './configuration.js';
import { helmetOptions } from './helmets.js';
import { requestLimit } from './rateLimit.js';
import restaurantRoutes from '../src/restaurant.routes.js'
import tableRoutes from '../src/table.routes.js'
import menuRoutes from '../src/menu.routes.js'

const BASE_PATH = '/Heaven Flavor/rest';

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false, limit: '10mb'}));
    app.use(express.json({limit: '10mb'}));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
    app.use(helmet(helmetOptions));
    app.use(requestLimit);
};

const routes = (app) => {
    app.use(`${BASE_PATH}/fields`, restaurantRoutes);
    app.use(`${BASE_PATH}/fields`, tableRoutes);
    app.use(`${BASE_PATH}/fields`, menuRoutes
        
    );
    app.get(`${BASE_PATH}/health`, (reg, res) => {
        res.status(200).json({
            status: 'healthy',
            service: 'Heaven Flavor: Restaurant Service.'
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