'use strict';

import { body, param } from "express-validator";
import { checkValidators } from "./check-validators.js";
import Reservation from "../src/Model/reservation.model.js"

export const validateCreateOrder = [
    body("restaurantId")
        .notEmpty().withMessage("El restaurante es requerido.")
        .isMongoId().withMessage("El id del restaurante no es válido.")
        .custom(async (value) => {
            try {
                const response = await fetch(`http://localhost:3021/heaven-flavor/rest/restaurant/${value}`);
                if (!response.ok) {
                    throw new Error('El restaurante no existe o no está disponible.');
                }
                return true;
            } catch (error) {
                throw new Error('No se pudo verificar el restaurante en este momento.');
            }
        }),
    body("reservationId")
        .notEmpty().withMessage("La reservación es requerida.")
        .isMongoId().withMessage("El id de la reservación no es válido.")
        .custom(async (value) => {
            const reservation = await Reservation.findOne({ _id: value, isActive: true });
            if (!reservation) {
                throw new Error('La reservacion no existe o ha sido desactivado.');
            }
            return true;
        }),
    body("customerName")
        .trim()
        .notEmpty().withMessage("El nombre del cliente es requerido.")
        .isLength({ min: 3, max: 200 })
        .withMessage("El nombre del cliente debe tener entre 3 y 200 caracteres."),
    body("items")
        .isArray({ min: 1 }).withMessage("Debe incluir al menos un plato en el pedido."),
    body("items.*.menuItemId")
        .notEmpty().withMessage("El id del plato es requerido.")
        .isMongoId().withMessage("El id del plato no es válido."),
    body("items.*.quantity")
        .notEmpty().withMessage("La cantidad es requerida.")
        .isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero mayor a 0."),
    body("items.*.price")
        .notEmpty().withMessage("El precio del plato es requerido.")
        .isFloat({ min: 0 }).withMessage("El precio no puede ser negativo."),
    body("status")
        .optional()
        .toLowerCase()
        .isIn(["en preparación", "listo", "entregado", "cancelado"])
        .withMessage("Estado de pedido no válido."),
    body('isAvailable')
        .optional()
        .isBoolean()
        .withMessage('El valor de disponibilidad debe ser verdadero o falso.')
        .customSanitizer(value => {
            if (value === 'true') return true;
            if (value === 'false') return false;
            return value;
        }),
    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('El valor de disponibilidad debe ser verdadero o falso.')
        .customSanitizer(value => {
            if (value === 'true') return true;
            if (value === 'false') return false;
            return value;
        }),
    checkValidators
];

export const validateUpdateOrder = [
    param("id")
        .isMongoId()
        .withMessage("El id del pedido no es válido."),
    body("customerName")
        .trim()
        .optional()
        .isLength({ min: 3, max: 200 })
        .withMessage("El nombre del cliente debe tener entre 3 y 200 caracteres."),
    body("items")
        .optional()
        .isArray({ min: 1 }).withMessage("Debe incluir al menos un plato en el pedido."),
    body("items.*.menuItemId")
        .optional()
        .isMongoId().withMessage("El id del plato no es válido."),
    body("items.*.quantity")
        .optional()
        .isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero mayor a 0."),
    body("items.*.price")
        .optional()
        .isFloat({ min: 0 }).withMessage("El precio no puede ser negativo."),
    body("status")
        .optional()
        .toLowerCase()
        .isIn(["en preparación", "listo", "entregado", "cancelado"])
        .withMessage("Estado de pedido no válido."),
    body('isAvailable')
        .optional()
        .isBoolean()
        .withMessage('El valor de disponibilidad debe ser verdadero o falso.')
        .customSanitizer(value => {
            if (value === 'true') return true;
            if (value === 'false') return false;
            return value;
        }),
    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('El valor de disponibilidad debe ser verdadero o falso.')
        .customSanitizer(value => {
            if (value === 'true') return true;
            if (value === 'false') return false;
            return value;
        }),
    checkValidators
];

export const validateGetOrdersByRestaurant = [
    param("restaurantId")
        .isMongoId().withMessage("El id del restaurante no es válido."),
    checkValidators
];

export const validateDesactivateOrder = [
    param("id")
        .isMongoId().withMessage("El id del pedido no es válido."),
    checkValidators
];