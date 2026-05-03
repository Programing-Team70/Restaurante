'use strict';

import { body, param } from "express-validator";
import { checkValidators } from "./check-validators.js";

export const validateCreateReservation = [
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
    body("tableId")
        .optional()
        .isMongoId().withMessage("El id de la mesa no es válido.")
        .custom(async (value) => {
            try {
                const response = await fetch(`http://localhost:3021/heaven-flavor/rest/table/${value}`);
                if (!response.ok) {
                    throw new Error('La mesa no existe o no está disponible.');
                }
                return true;
            } catch (error) {
                throw new Error('No se pudo verificar la mesa en este momento.');
            }
        })
        .custom((value, { req }) => {
            if (req.body.type === "mesa" && !value) {
                throw new Error("Si el tipo es 'mesa', el tableId es obligatorio.");
            }
            return true;
        }),
    body("customerName")
        .trim()
        .notEmpty().withMessage("El nombre del cliente es requerido.")
        .isLength({ min: 3, max: 200 }).withMessage("El nombre debe tener entre 3 y 200 caracteres."),
    body("customerPhone")
        .trim()
        .notEmpty().withMessage("El teléfono es requerido.")
        .isLength({ min: 8, max: 8 }).withMessage("El teléfono debe tener exactamente 8 dígitos.")
        .isNumeric().withMessage("El teléfono solo debe contener números."),
    body("type")
        .notEmpty().withMessage("El tipo de reservación es requerido.")
        .toLowerCase()
        .isIn(["mesa", "domicilio", "para llevar"]).withMessage("Tipo de reservación no válido."),
    body("date")
        .notEmpty().withMessage("La fecha de la reservación es requerida.")
        .isISO8601().withMessage("La fecha debe tener un formato válido.")
        .custom((value) => {
            const inputDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (inputDate < today) {
                throw new Error("No se pueden programar reservas para fechas pasadas.");
            }
            return true;
        }),
    body("guests")
        .optional()
        .isInt({ min: 1, max: 50 }).withMessage("El número de invitados debe ser al menos 1."),
    body("notes")
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage("Las notas no pueden exceder 500 caracteres."),
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

export const validateUpdateReservation = [
    param("id")
        .isMongoId()
        .withMessage("El id de la reservación no es válido."),
    body("customerName")
        .trim()
        .optional()
        .isLength({ min: 3, max: 200 }).withMessage("El nombre debe tener entre 3 y 200 caracteres."),
    body("customerPhone")
        .trim()
        .optional()
        .isLength({ min: 8, max: 8 }).withMessage("El teléfono debe tener exactamente 8 dígitos.")
        .isNumeric().withMessage("El teléfono solo debe contener números."),
    body("type")
        .optional()
        .toLowerCase()
        .isIn(["mesa", "domicilio", "para llevar"]).withMessage("Tipo de reservación no válido."),
    body("date")
        .optional()
        .isISO8601().withMessage("La fecha debe tener un formato válido.")
        .custom((value) => {
            const inputDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (inputDate < today) {
                throw new Error("No se pueden programar reservas para fechas pasadas.");
            }
            return true;
        }),
    body("guests")
        .optional()
        .isInt({ min: 1, max: 50 }).withMessage("El número de invitados debe ser al menos 1."),
    body("notes")
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage("Las notas no pueden exceder 500 caracteres."),
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

export const validateCancelReservation = [
    param("id")
        .isMongoId().withMessage("El id de la reservación no es válido."),
    checkValidators
];

export const validateGetReservationsByRestaurant = [
    param("restaurantId")
        .isMongoId().withMessage("El id del restaurante no es válido."),
    checkValidators
];

export const validateDesactivateReservation = [
    param("id")
        .isMongoId().withMessage("El id de la reservación no es válido."),
    checkValidators
];