import { Router } from "express";
import {
  validateCreateOrder,
  validateUpdateOrder,
  validateGetOrdersByRestaurant,
  validateDesactivateOrder
} from "../../middlewares/order-validator.js"
import {
  createOrder,
  updateOrder,
  getOrdersByRestaurant,
  getOrders,
  desactivateOrder,
} from "../Controller/order.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *     name: Orders
 *     description: Endpoints para la gestión de pedidos de comida vinculados a reservaciones
 */

/**
 * @swagger
 * /reser/order/:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Pedido creado correctamente y enviado a cocina
 *       500:
 *         description: Error al procesar el pedido
 */
router.post(
  "/",
  validateCreateOrder,
  createOrder
);

/**
 * @swagger
 * /reser/order/{id}:
 *   patch:
 *     summary: Actualizar el estado de un pedido
 *     tags: [Orders]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID único del pedido
 *       schema:
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ord'
 *     responses:
 *       200:
 *         description: Estado actualizado y notificación generada
 *       500:
 *         description: Error al intentar actualizar el estado del pedido
 */
router.patch(
  "/:id",
  validateUpdateOrder, 
  updateOrder
);

/**
 * @swagger
 * /reser/order/{id}:
 *   delete:
 *     summary: Eliminar un pedido
 *     tags: [Orders]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID único del pedido a eliminar
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Pedido eliminado correctamente
 *       500:
 *         description: Error al intentar eliminar el pedido
 */
router.delete(
  "/:id",
  validateDesactivateOrder, 
  desactivateOrder
);

/**
 * @swagger
 * /reser/order/:
 *   get:
 *     summary: Obtener ordenes.
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de ordenes obtenida exitosamente
 *       500:
 *         description: Error al obtener las ordenes
 */
router.get(
  "/",
  getOrders
);

/**
 * @swagger
 * /reser/order/restaurant/{restaurantId}:
 *   get:
 *     summary: Obtener pedidos por restaurante
 *     tags: [Orders]
 *     parameters:
 *     - in: path
 *       name: restaurantId
 *       required: true
 *       description: ID del restaurante para filtrar los pedidos
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida exitosamente
 *       500:
 *         description: Error al obtener los pedidos del restaurante
 */
router.get(
  "/restaurant/:restaurantId",
  validateGetOrdersByRestaurant, 
  getOrdersByRestaurant
);

export default router;
