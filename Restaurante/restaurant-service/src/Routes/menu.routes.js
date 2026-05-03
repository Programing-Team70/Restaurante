import { Router } from "express";
import {
  createMenuItem,
  getMenuByRestaurant,
  getMenuItemById,
  updateMenuItem,
  desactivateMenuItem,
} from "../Controller/menu.controller.js";
import {
  validateCreateMenu,
  validateUpdateMenu,
  validateDesactivateMenu,
  validateGetMenuByRestaurant,
  validateGetMenuItemById
} from "../../middlewares/menu-validator.js";

import mongoose from "mongoose";

const router = Router();

/**
 * @swagger
 * tags:
 *     name: Menu
 *     description: Gestión de platillos del menú (MenuItem)
 */

/**
 * @swagger
 * /res/menu/:
 *   post:
 *     summary: Crear un nuevo platillo
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       201:
 *         description: Platillo creado con éxito
 *       400:
 *         description: Error en la validación de los datos
 */
router.post(
  "/", 
  validateCreateMenu, 
  createMenuItem
);

/**
 * @swagger
 * /res/menu/{id}:
 *   put:
 *     summary: Actualizar un platillo
 *     tags: [Menu]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID del platillo a editar
 *       schema:
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       200:
 *         description: Platillo actualizado correctamente
 *       400:
 *         description: ID de platillo con formato inválido
 *       404:
 *         description: El platillo no existe
 *       500:
 *         description: Error interno del servidor
 */
router.put(
  "/:id", 
  validateUpdateMenu, 
  updateMenuItem
);

/**
 * @swagger
 * /res/menu/{id}:
 *   delete:
 *     summary: Desactivar un platillo
 *     tags: [Menu]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID único del platillo a desactivar
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Platillo desactivado correctamente
 *       400:
 *         description: ID de platillo con formato inválido
 *       404:
 *         description: El platillo no existe
 *       500:
 *         description: Error interno del servidor
 */
router.delete(
  "/:id", 
  validateDesactivateMenu, 
  desactivateMenuItem
);

/**
 * @swagger
 * /res/menu/{restaurantId}:
 *   get:
 *     summary: Obtener menú por restaurante
 *     tags: [Menu]
 *     parameters:
 *     - in: path
 *       name: restaurantId
 *       required: true
 *       description: ID único del restaurante (ObjectId)
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Lista de platillos obtenida correctamente
 *       400:
 *         description: ID de restaurante con formato inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get(
  "/:restaurantId",
  validateGetMenuByRestaurant,
  getMenuByRestaurant
);

/**
 * @swagger
 * /res/menu/{id}:
 *   get:
 *     summary: Obtener menu por ID
 *     tags: [Menu]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID único (ObjectId)
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Detalle del platillo obtenido
 *       404:
 *         description: El platillo no existe o está desactivado
 */
router.get(
  "/:id", 
  getMenuItemById
);

export default router;
