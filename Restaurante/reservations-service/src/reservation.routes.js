import { Router } from "express";

import {
  createReservation,
  updateReservation,
  cancelReservation,
  deleteReservation,
  getReservationsByRestaurant,
} from "./reservation.controller.js";

const router = Router();
/**
 * @swagger
 * tags:
 *     name: Reservations
 *     description: Endpoints para la gestión de reservas de mesas y clientes
 */

/**
 * @swagger
 * /res/reservations/:
 *   post:
 *     summary: Crear una nueva reservación
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Reservación creada correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", createReservation);

/**
 * @swagger
 * /res/reservations/{id}:
 *   put:
 *     summary: Actualizar una reservación
 *     tags: [Reservations]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID único de la reservación a actualizar
 *       schema:
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Reservación actualizada con éxito
 *       500:
 *         description: Error al intentar actualizar la reservación
 */
router.put("/:id", updateReservation);

/**
 * @swagger
 * /res/reservations/{id}/cancel:
 *   patch:
 *     summary: Cancelar una reservación
 *     tags: [Reservations]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID de la reservación que se desea cancelar
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Reservación cancelada y notificación enviada
 *       500:
 *         description: Error al procesar la cancelación
 */
router.patch("/:id/cancel", cancelReservation);

/**
 * @swagger
 * /res/reservations/{id}:
 *   delete:
 *     summary: Desactivar una reservación
 *     tags: [Reservations]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID único de la reservación a eliminar permanentemente
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Reservación eliminada correctamente
 *       500:
 *         description: Error interno al intentar eliminar la reservación
 */
router.delete("/:id", deleteReservation);

/**
 * @swagger
 * /res/reservations/restaurant/{restaurantId}:
 *   get:
 *     summary: Obtener reservaciones por restaurante
 *     tags: [Reservations]
 *     parameters:
 *     - in: path
 *       name: restaurantId
 *       required: true
 *       description: ID del restaurante para filtrar las reservaciones
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Lista de reservaciones obtenida exitosamente
 *       500:
 *         description: Error al obtener las reservaciones
 */
router.get("/restaurant/:restaurantId", getReservationsByRestaurant);

export default router;
