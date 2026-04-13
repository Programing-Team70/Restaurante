"use strict";

import { Router } from "express";

import {
  createEvent,
  getEventsByRestaurant,
  updateEvent,
  deleteEvent,
} from "./event.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *     name: Events
       description: Endpoints para la gestión de eventos y servicios de restaurante
 */

/**
 * @swagger
 * /even/events/:
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
router.post("/", createEvent);

/**
 * @swagger
 * /even/events/events/{restaurantId}:
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
router.get("/events/:restaurantId", getEventsByRestaurant);

/**
 * @swagger
 * /even/events/{id}:
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
router.put("/:id", updateEvent);

/**
 * @swagger
 * /even/events/{id}:
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
router.delete("/:id", deleteEvent);

export default router;
