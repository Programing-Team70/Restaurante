import { Router } from "express";
import { uploadImages } from "../middlewares/file-uploader.js";
import {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "./restaurant.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *     name: Restaurant
 *     description: Endpoints para la gestión de la información del restaurante
 */

/**
 * @swagger
 * /res/restaurants/:
 *   post:
 *     summary: Crear un nuevo restaurante con imágenes
 *     tags: [Restaurant]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: Restaurante creado con éxito
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", uploadImages.array("photos", 5), createRestaurant);

/**
 * @swagger
 * /res/restaurants/{id}:
 *   put:
 *     summary: Actualizar información de un restaurante
 *     tags: [Restaurant]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: ID del restaurante a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       200:
 *         description: Restaurante actualizado correctamente
 *       400:
 *         description: Error en la actualización o ID inválido
 *       404:
 *         description: Restaurante no encontrado
 */
router.put("/:id", uploadImages.array("photos", 5), updateRestaurant);

/**
 * @swagger
 * /res/restaurants/{id}:
 *   delete:
 *     summary: Desactivar un restaurante
 *     tags: [Restaurant]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: ID del restaurante a desactivar
 *     responses:
 *       200:
 *         description: Restaurante desactivado correctamente
 *       404:
 *         description: Restaurante no encontrado
 */
router.delete("/:id", deleteRestaurant);

export default router;
