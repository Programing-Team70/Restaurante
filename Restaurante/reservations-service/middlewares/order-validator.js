'use strict';

import { body, param } from "express-validator";
import { validateJWT } from "./validate-JWT.js";
import { checkValidators } from "./check-validators.js";

export const validateCreateOrder = [
    validateJWT,
    body("restaurantId")
        .notEmpty()
        .withMessage("El restaurante es requerido.")
        .isMongoId()
        .withMessage("El id del restaurante no es válido."),
    body("reservationId")
        .optional()
        .isMongoId()
        .withMessage("El id de la reservación no es válido."),
    body("customerName")
        .trim()
        .notEmpty()
        .withMessage("El nombre del cliente es requerido.")
        .isLength({ min: 2, max: 100 })
        .withMessage("El nombre del cliente debe tener entre 2 y 100 caracteres."),
    body("items")
        .isArray({ min: 1 })
        .withMessage("Debe incluir al menos un plato en el pedido."),
    body("items.*.menuItemId")
        .notEmpty()
        .withMessage("El plato del menú es requerido.")
        .isMongoId()
        .withMessage("El id del plato no es válido."),
    body("items.*.name")
        .trim()
        .notEmpty()
        .withMessage("El nombre del plato es requerido.")
        .isLength({ max: 100 })
        .withMessage("El nombre del plato no puede exceder 100 caracteres."),
    body("items.*.quantity")
        .notEmpty()
        .withMessage("La cantidad es requerida.")
        .isInt({ min: 1 })
        .withMessage("La cantidad debe ser al menos 1."),
    body("items.*.price")
        .notEmpty()
        .withMessage("El precio del plato es requerido.")
        .isFloat({ min: 0 })
        .withMessage("El precio debe ser mayor o igual a 0."),
    checkValidators
];

export const validateUpdateOrderStatus = [
    validateJWT,
    param("id")
        .isMongoId()
        .withMessage("El id del pedido no es válido."),
    body("status")
        .notEmpty()
        .withMessage("El estado del pedido es requerido.")
        .isIn(["en preparación", "listo", "entregado", "cancelado"])
        .withMessage("Estado de pedido no válido."),
    checkValidators
];

export const validateOrdersByRestaurant = [
    validateJWT,
    param("restaurantId")
        .isMongoId()
        .withMessage("El id del restaurante no es válido."),
    checkValidators
];

export const validateDeleteOrder = [
    validateJWT,
    param("id")
        .isMongoId()
        .withMessage("El id del pedido no es válido."),
    checkValidators
];