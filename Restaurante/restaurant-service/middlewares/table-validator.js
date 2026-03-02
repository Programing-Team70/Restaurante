import { body, param } from 'express-validator';
import { validateJWT } from './validate-JWT.js';
import { checkValidators } from './check-validators.js';

export const validateCreateField = [
    validateJWT,
    body('restaurantName')
        .trim()
        .notEmpty()
        .withMessage('l nombre del restaurante es requerido.')
        .isLength({ min: 2, max: 200 })
        .withMessage('El nombre del restaurante no puede exceder 200 caracteres.'),
    body('restaurantAddress')
        .trim()
        .notEmpty()
        .withMessage('La direccion del restaurante es requerido.')
        .isLength({ min: 2, max: 100 })
        .withMessage('La direccion del restaurante no puede exceder 100 caracteres.'),
    body('restaurantSchedule')
        .trim()
        .notEmpty()
        .withMessage('El horario del restaurante es requerido.')
        .isLength({ min: 2, max: 100 })
        .withMessage('El horario del restaurante no puede exceder 100 caracteres.'),
    body('restaurantCategory')
        .trim()
        .notEmpty()
        .withMessage('La categoria del restaurante es requerido.')
        .isLength({ min: 2, max: 100 })
        .withMessage('La categoria del restaurante no puede exceder 100 caracteres.'),
    body('averagePrice')
        .notEmpty()
        .withMessage('El precio promedio del restaurante es requerido.')
        .isFloat({ min: 0 })
        .withMessage('El precio promedio debe ser mayor o igual a 0.'),
    checkValidators,
];