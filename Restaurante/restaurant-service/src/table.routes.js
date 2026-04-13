import { Router } from "express";
import {
  createTable,
  getTablesByRestaurant,
  updateTable,
  deleteTable,
} from "./table.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *     name: Table
 *     description: Gestión de mesas y disponibilidad del restaurante
 */

/**
 * @swagger
 * /res/tables/:
 *   post:
 *     summary: Registrar una nueva mesa
 *     tags: [Table]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Table'
 *     responses:
 *       201:
 *         description: Mesa creada con éxito
 *       400:
 *         description: Error en la validación de los datos
 */
router.post("/", createTable);

/**
 * @swagger
 * /res/tables/restaurant/{restaurantId}:
 *   get:
 *     summary: Obtener todas las mesas de un restaurante
 *     tags: [Table]
 *     parameters:
 *     - in: path
 *       name: restaurantId
 *       required: true
 *       description: ID único del restaurante para filtrar sus mesas
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Lista de mesas obtenida con éxito
 *       500:
 *         description: Error interno del servidor al obtener las mesas
 */
router.get("/restaurant/:restaurantId", getTablesByRestaurant);

/**
 * @swagger
 * /res/tables/{id}:
 *   put:
 *     summary: Actualizar una mesa específica
 *     tags: [Table]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID único de la mesa a modificar
 *       schema:
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Table'
 *     responses:
 *       200:
 *         description: Mesa actualizada con éxito
 *       404:
 *         description: No se encontró la mesa con el ID proporcionado
 *       500:
 *         description: Error interno del servidor al actualizar la mesa
 */
router.put("/:id", updateTable);

/**
 * @swagger
 * /res/tables/{id}:
 *   delete:
 *     summary: Eliminar una mesa específica
 *     tags: [Table]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID único de la mesa que se desea eliminar
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Mesa eliminada con éxito
 *       404:
 *         description: No se encontró la mesa con el ID proporcionado
 *       500:
 *         description: Error interno del servidor al intentar eliminar la mesa
 */
router.delete("/:id", deleteTable);

export default router;
