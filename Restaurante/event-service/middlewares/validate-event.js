'use strict';

import { body, param } from "express-validator";
import { validateJWT } from "./validate-JWT.js";
import { checkValidators } from "./check-validators.js";

export const validateCreateEvent = [
    validateJWT,
    body('restaurant')
        .notEmpty().withMessage('El ID del restaurante es obligatorio.')
        .isMongoId().withMessage('ID de restaurante no válido.'),
    body('title')
        .trim()
        .notEmpty().withMessage('El título del evento es requerido.')
        .isLength({ max: 150 }).withMessage('El título es muy largo.'),
    body('description')
        .trim()
        .notEmpty().withMessage('La descripción es obligatoria.'),
    body('eventType')
        .notEmpty().withMessage('El tipo de evento es requerido.')
        .isIn(["cena temática", "promoción", "degustación", "festival"])
        .withMessage('Tipo de evento no permitido.'),
    body('eventDate')
        .notEmpty().withMessage('La fecha es requerida.')
        .isISO8601().withMessage('Formato de fecha inválido (ISO8601).')
        .custom((value) => {
            if (new Date(value) < new Date()) {
                throw new Error('No puedes programar un evento en una fecha pasada.');
            }
            return true;
        }),
    body('resources.music')
        .optional()
        .isString().withMessage('El campo música debe ser texto.'),
    body('resources.decoration')
        .optional()
        .isString().withMessage('El campo decoración debe ser texto.'),
    body('resources.extraStaffNeeded')
        .optional()
        .isInt({ min: 0 }).withMessage('El número de personal debe ser positivo.'),
    body('resources.specialMenu')
        .optional()
        .isArray().withMessage('El menú especial debe ser un arreglo de IDs.'),
    body('resources.specialMenu.*')
        .isMongoId().withMessage('ID de plato no válido dentro del menú.'),
    checkValidators
];

export const validateUpdateEvent = [
    validateJWT,
    param('id').isMongoId().withMessage('ID de evento no válido.'),
    body('eventDate').optional().isISO8601().custom((value) => {
        if (new Date(value) < new Date()) {
            throw new Error('La nueva fecha no puede ser en el pasado.');
        }
        return true;
    }),
    checkValidators
];