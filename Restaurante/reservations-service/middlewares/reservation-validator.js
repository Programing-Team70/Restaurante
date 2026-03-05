'use strict';

import { body, param } from "express-validator";
import { validateJWT } from "./validate-JWT.js";
import { checkValidators } from "./check-validators.js";

export const validateCreateReservation = [
    validateJWT,
    body("restaurantId")
        .notEmpty()
        .withMessage("El restaurante es requerido.")
        .isMongoId()
        .withMessage("El id del restaurante no es válido."),
    body("tableId")
        .optional()
        .isMongoId()
        .withMessage("El id de la mesa no es válido."),
    body("orderId")
        .optional()
        .isMongoId()
        .withMessage("El id del pedido no es válido."),
    body("customerName")
        .trim()
        .notEmpty()
        .withMessage("El nombre del cliente es requerido.")
        .isLength({ min: 2, max: 100 })
        .withMessage("El nombre debe tener entre 2 y 100 caracteres."),
    body("customerPhone")
        .optional()
        .trim()
        .isLength({ min: 6, max: 20 })
        .withMessage("El teléfono debe tener entre 6 y 20 caracteres."),
    body("type")
        .notEmpty()
        .withMessage("El tipo de reservación es requerido.")
        .isIn(["mesa", "domicilio", "para llevar"])
        .withMessage("Tipo de reservación no válido."),
    body("date")
        .notEmpty()
        .withMessage("La fecha de la reservación es requerida.")
        .isISO8601()
        .withMessage("La fecha debe tener un formato válido."),
    body("guests")
        .optional()
        .isInt({ min: 1 })
        .withMessage("El número de invitados debe ser al menos 1."),
    body("notes")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Las notas no pueden exceder 500 caracteres."),
    checkValidators
];

export const validateUpdateReservation = [
    validateJWT,
    param("id")
        .isMongoId()
        .withMessage("El id de la reservación no es válido."),
    body("customerName")
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("El nombre debe tener entre 2 y 100 caracteres."),
    body("customerPhone")
        .optional()
        .trim()
        .isLength({ min: 6, max: 20 })
        .withMessage("El teléfono debe tener entre 6 y 20 caracteres."),
    body("guests")
        .optional()
        .isInt({ min: 1 })
        .withMessage("El número de invitados debe ser al menos 1."),
    body("status")
        .optional()
        .isIn([
        "pendiente",
        "confirmada",
        "en curso",
        "completada",
        "cancelada"
        ])
        .withMessage("Estado de reservación no válido."),
    checkValidators
];

export const validateCancelReservation = [
    validateJWT,
    param("id")
        .isMongoId()
        .withMessage("El id de la reservación no es válido."),
    checkValidators
];

export const validateReservationsByRestaurant = [
    validateJWT,
    param("restaurantId")
        .isMongoId()
        .withMessage("El id del restaurante no es válido."),
    checkValidators
];

export const validateDeleteReservation = [
    validateJWT,
    param("id")
        .isMongoId()
        .withMessage("El id de la reservación no es válido."),
    checkValidators
];