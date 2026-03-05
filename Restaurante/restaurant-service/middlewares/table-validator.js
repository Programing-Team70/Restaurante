import { body, param } from 'express-validator';
import { validateJWT } from './validate-JWT.js';
import { checkValidators } from './check-validators.js';

export const validateCreateField = [
    validateJWT,
    body('restaurant')
        .notEmpty()
        .withMessage('El restaurante es requerido.')
        .isMongoId()
        .withMessage('El ID del restaurante no es válido.'),
    body('capacity')
        .notEmpty()
        .withMessage('La capacidad de la mesa es requerida.')
        .isFloat({ min: 1 })
        .withMessage('La capacidad de la mesa debe ser mayor o igual a 1.'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('La localizacion de la mesa es requerida.')
        .isLength({ min: 2, max: 200 })
        .withMessage('La localizacion no puede exceder 200 caracteres.'),
    body('availableHours')
        .isArray({ min: 1 })
        .withMessage('Debe enviar al menos un horario disponible.'),
    body('availableHours.*.start')
        .notEmpty()
        .withMessage('El horario de inicio es requerido.')
        .isLength({ max: 100 })
        .withMessage('El horario de inicio no puede exceder 100 caracteres.'),
    body('availableHours.*.end')
        .notEmpty()
        .withMessage('El horario de fin es requerido.')
        .isLength({ max: 100 })
        .withMessage('El horario de fin no puede exceder 100 caracteres.'),
    body('isAvailable')
        .optional()
        .isBoolean()
        .withMessage('El valor de disponibilidad debe ser verdadero o falso.'),
    checkValidators,
];