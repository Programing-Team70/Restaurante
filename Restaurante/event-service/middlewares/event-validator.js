'use strict';

import { body, param } from "express-validator";
import { checkValidators } from "./check-validators.js";

export const validateCreateEvent = [
    body('restaurantId')
        .notEmpty().withMessage('El ID del restaurante es obligatorio.')
        .isMongoId().withMessage('ID de restaurante no válido.')
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
    body('title')
        .trim()
        .notEmpty().withMessage('El título del evento es requerido.')
        .isLength({ min: 3, max: 200 }).withMessage('El título debe tener entre 3 y 200 caracteres.'),
    body('description')
        .trim()
        .notEmpty().withMessage('La descripción es obligatoria.'),
    body('eventType')
        .notEmpty().withMessage('El tipo de evento es requerido.')
        .toLowerCase()
        .isIn(["cena temática", "promoción", "degustación", "festival", "privado"])
        .withMessage('Tipo de evento no permitido.'),
    body('eventDate')
        .notEmpty().withMessage("La fecha es requerida.")
        .isISO8601().withMessage("La fecha debe tener un formato válido.")
        .custom((value) => {
            const inputDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (inputDate < today) {
                throw new Error("No se pueden programar eventos para fechas pasadas.");
            }
            return true;
        }),
    body('capacity')
        .notEmpty().withMessage('La capacidad es requerida.')
        .isInt({ min: 1, max: 50 }).withMessage('La capacidad debe estar entre 1 y 50 personas.'),
    body('status')
        .optional()
        .toLowerCase()
        .isIn(["programado", "activo", "finalizado", "cancelado"])
        .withMessage('Estado no válido.'),
    body('resources.music')
        .optional()
        .trim()
        .isString().withMessage('El campo música debe ser texto.'),
    body('resources.decoration')
        .optional()
        .trim()
        .isString().withMessage('El campo decoración debe ser texto.'),
    body('resources.extraStaffNeeded')
        .optional()
        .isInt({ min: 0, max: 50 }).withMessage('El número de personal extra no puede ser negativo.'),
    body('resources.specialMenu')
        .optional()
        .isArray().withMessage('El menú especial debe ser un arreglo de IDs.'),
    body('resources.specialMenu.*')
        .isMongoId().withMessage('Cada ID de plato en el menú especial debe ser un ID de Mongo válido.'),
    body('notes')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Las notas no pueden exceder los 500 caracteres.'),
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

export const validateUpdateEvent = [
    param('id')
        .isMongoId().withMessage('ID de evento no válido.'),
    body('title')
        .trim()
        .notEmpty().withMessage('El título del evento es requerido.')
        .isLength({ min: 3, max: 200 }).withMessage('El título debe tener entre 3 y 200 caracteres.'),
    body('description')
        .trim()
        .notEmpty().withMessage('La descripción es obligatoria.'),
    body('eventType')
        .notEmpty().withMessage('El tipo de evento es requerido.')
        .toLowerCase()
        .isIn(["cena temática", "promoción", "degustación", "festival", "privado"])
        .withMessage('Tipo de evento no permitido.'),
    body('eventDate')
        .notEmpty().withMessage("La fecha es requerida.")
        .isISO8601().withMessage("La fecha debe tener un formato válido.")
        .custom((value) => {
            const inputDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (inputDate < today) {
                throw new Error("No se pueden programar eventos para fechas pasadas.");
            }
            return true;
        }),
    body('capacity')
        .notEmpty().withMessage('La capacidad es requerida.')
        .isInt({ min: 1, max: 50 }).withMessage('La capacidad debe estar entre 1 y 50 personas.'),
    body('status')
        .optional()
        .toLowerCase()
        .isIn(["programado", "activo", "finalizado", "cancelado"])
        .withMessage('Estado no válido.'),
    body('resources.music')
        .optional()
        .trim()
        .isString().withMessage('El campo música debe ser texto.'),
    body('resources.decoration')
        .optional()
        .trim()
        .isString().withMessage('El campo decoración debe ser texto.'),
    body('resources.extraStaffNeeded')
        .optional()
        .isInt({ min: 0, max: 50 }).withMessage('El número de personal extra no puede ser negativo.'),
    body('resources.specialMenu')
        .optional()
        .isArray().withMessage('El menú especial debe ser un arreglo de IDs.'),
    body('resources.specialMenu.*')
        .isMongoId().withMessage('Cada ID de plato en el menú especial debe ser un ID de Mongo válido.'),
    body('notes')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Las notas no pueden exceder los 500 caracteres.'),
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

export const validateDesactivateEvent = [
    param('id')
        .isMongoId().withMessage('ID de evento no válido.'),
    checkValidators
];

export const validateGetEventByRestaurant = [
    param('restaurantId')
        .isMongoId().withMessage('ID de restaurante no válido.'),
    checkValidators
];

export const cancelEvent = [
    param('restaurantId').isMongoId().withMessage('ID de restaurante no válido.'),
    checkValidators
];