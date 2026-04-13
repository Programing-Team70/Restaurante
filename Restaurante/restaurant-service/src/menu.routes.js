import { Router } from "express";
import {
  createMenuItem,
  getMenuByRestaurant,
  updateMenuItem,
  deleteMenuItem,
} from "./menu.controller.js";

import mongoose from "mongoose";

const router = Router();

const validateObjectId = (req, res, next) => {
  const id = req.params.id || req.params.restaurantId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "ID inválido",
    });
  }
  next();
};

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
router.post("/", createMenuItem);

/**
 * @swagger
 * /res/menu/restaurant/{restaurantId}:
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
router.get("/restaurant/:restaurantId", validateObjectId, getMenuByRestaurant);

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
router.put("/:id", validateObjectId, updateMenuItem);

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
router.delete("/:id", validateObjectId, deleteMenuItem);

export default router;
