import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateRestaurant = [
    body('restaurantName')
        .trim()
        .notEmpty().withMessage('El nombre del restaurante es requerido.')
        .isLength({ min: 2, max: 200 })
        .withMessage('El nombre debe tener entre 2 y 200 caracteres.'),
    body('restaurantAddress')
        .trim()
        .notEmpty().withMessage('La dirección del restaurante es requerida.')
        .isLength({ min: 5, max: 500 })
        .withMessage('La dirección debe tener entre 5 y 500 caracteres.'),
    body('restaurantSchedule')
        .trim()
        .notEmpty().withMessage('El horario es requerido.')
        .isLength({ max: 150 })
        .withMessage('El horario no puede exceder los 150 caracteres.'),
    body('restaurantCategory')
        .trim()
        .notEmpty().withMessage('La categoría es requerida.')
        .isLength({ max: 100 })
        .withMessage('La categoría no puede exceder los 100 caracteres.'),
    body('averagePrice')
        .notEmpty().withMessage('El precio promedio es requerido.')
        .isFloat({ min: 0 }).withMessage('El precio promedio debe ser un número mayor o igual a 0.'),
    body('contact.phone')
        .trim()
        .notEmpty().withMessage('El numero de telefono del restaurante es requerida.')
        .matches(/^[0-9+ ]+$/).withMessage('Numero de telefono invalido.'),
    body('contact.email')
        .notEmpty().withMessage('El correo del restaurante es requerida.')
        .isEmail().withMessage('Correo invalido.')
        .normalizeEmail(),
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

export const validateUpdateRestaurant = [
    param('id')
        .isMongoId().withMessage('El ID del restaurante no es válido.'),
    body('restaurantName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 200 }).withMessage('Nombre inválido.'),
    body('restaurantAddress')
        .optional()
        .trim()
        .isLength({ min: 5, max: 500 }).withMessage('Dirección inválida.'),
    body('restaurantSchedule')
        .optional()
        .trim(),
    body('restaurantCategory')
        .optional()
        .trim(),
    body('averagePrice')
        .optional()
        .isFloat({ min: 0 }).withMessage('Precio promedio inválido.'),
    body('contact.phone')
        .optional()
        .trim()
        .matches(/^[0-9+ ]+$/).withMessage('Numero de telefono invalido.'),
    body('contact.email')
        .optional()
        .isEmail().withMessage('Correo invalido.')
        .normalizeEmail(),
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
        .isBoolean().withMessage('El valor de disponibilidad debe ser verdadero o falso.')
        .customSanitizer(value => {
            if (value === 'true') return true;
            if (value === 'false') return false;
            return value;
        }),
    checkValidators
];

export const validateDesactivateRestaurant = [
    param('id')
        .isMongoId().withMessage('El ID del restaurante proporcionado no es válido.'),
    checkValidators
];