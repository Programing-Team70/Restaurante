"use strict";

import { Router } from "express";
import {
  createEvent,
  getEventsByRestaurant,
  getAllEvents,
  updateEvent,
  cancelEvent,
  desactivateEvent,
} from "../Controller/event.controller.js";
import {
  validateCreateEvent,
  validateUpdateEvent,
  validateDesactivateEvent,
  validateGetEventByRestaurant,
} from "../../middlewares/event-validator.js";

const router = Router();

/**
 * @swagger
 * tags:
 *     name: Events
 *     description: Endpoints para la gestión de eventos y servicios de restaurante
 */

/**
 * @swagger
 * /even/event/:
 *   post:
 *     summary: Agregar nuevo evento
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/event'
 *     responses:
 *       201:
 *         description: Evento creado
 */
router.post(
  "/", 
  validateCreateEvent, 
  createEvent
);

/**
 * @swagger
 * /even/event:
 *   get:
 *     summary: Obtener todos los eventos activos (Global)
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: Número de registros a saltar
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Máximo de registros a devolver
 *     responses:
 *       200:
 *         description: Lista global de eventos obtenida con éxito
 */
router.get(
  "/", 
  getAllEvents
);


/**
 * @swagger
 * /even/event/restaurant/{restaurantId}:
 *   get:
 *     summary: Ver eventos de restaurante
 *     tags: [Events]
 *     parameters:
 *     - in: path
 *       name: restaurantId
 *       required: true
 *       description: ID del restaurante para filtrar eventos
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Lista de eventos obtenida con éxito
 */
router.get(
  "/restaurant/:restaurantId", 
  validateGetEventByRestaurant, 
  getEventsByRestaurant
);

/**
 * @swagger
 * /even/event/{id}:
 *   put:
 *     summary: Actualizar evento
 *     tags: [Events]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/event'
 *     responses:
 *       200:
 *         description: Evento actualizado
 */
router.put(
  "/:id", 
  validateUpdateEvent, 
  updateEvent
);

/**
 * @swagger
 * /even/event/{id}/cancel:
 *   patch:
 *     summary: Cancelar un evento (cambio de estado)
 *     tags: [Events]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Evento marcado como cancelado
 */
router.patch(
  "/:id/cancel", 
  validateUpdateEvent, 
  cancelEvent
);

/**
 * @swagger
 * /even/event/{id}:
 *   delete:
 *     summary: Desactivar evento
 *     tags: [Events]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Evento desactivado correctamente
 */
router.delete(
  "/:id", 
  validateDesactivateEvent, 
  desactivateEvent
);

export default router;
