import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateTable = [
    body('restaurant')
        .notEmpty().withMessage('El restaurante es requerido.')
        .isMongoId().withMessage('El ID del restaurante no es válido.')
        .custom(async (value) => {
            const restaurant = await Restaurant.findOne({ _id: value, isActive: true });
            if (!restaurant) {
                throw new Error('El restaurante no existe o ha sido desactivado.');
            }
            return true;
        }),
    body('capacity')
        .notEmpty().withMessage('La capacidad de la mesa es requerida.')
        .isInt({ min: 1 })
        .withMessage('La capacidad debe ser un número entero mayor a 0.'),
    body('location')
        .trim()
        .notEmpty().withMessage('La localización es requerida (ej. Terraza, Ventana).')
        .isLength({ min: 2, max: 200 })
        .withMessage('La localización debe tener entre 2 y 200 caracteres.'),
    body('availableHours')
        .isArray({ min: 1 })
        .withMessage('Debe enviar al menos un horario disponible.'),
    body('availableHours.*.start')
        .trim()
        .notEmpty().withMessage('El horario de inicio es requerido.')
        .matches(/^([01]\d|2[0-3]):?([0-5]\d)$/)
        .withMessage('Formato de inicio inválido (debe ser HH:mm).'),
    body('availableHours.*.end')
        .trim()
        .notEmpty().withMessage('El horario de fin es requerido.')
        .matches(/^([01]\d|2[0-3]):?([0-5]\d)$/)
        .withMessage('Formato de fin inválido (debe ser HH:mm).'),
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

export const validateUpdateTable = [
    param('id')
        .isMongoId().withMessage('ID de mesa no válido.'),
    body('capacity')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Capacidad debe ser un número entero mayor a 0.'),
    body('location')
        .optional()
        .trim()
        .isLength({ min: 2, max: 200 })
        .withMessage('La localización debe tener entre 2 y 200 caracteres.'),
    body('availableHours')
        .optional()
        .isArray({ min: 1 })
        .withMessage('Debe enviar al menos un horario disponible.'),
    body('availableHours.*.start')
        .optional()
        .matches(/^([01]\d|2[0-3]):?([0-5]\d)$/)
        .withMessage('Formato de inicio inválido (debe ser HH:mm).'),
    body('availableHours.*.end')
        .optional()
        .matches(/^([01]\d|2[0-3]):?([0-5]\d)$/)
        .withMessage('Formato de fin inválido (debe ser HH:mm).'),
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

export const validateDesactivateTable = [
    param('id')
        .isMongoId().withMessage('Formato invalido del ID.'),
    checkValidators
];

export const validateTableId = [
    param('id')
        .isMongoId().withMessage('ID de la mesa inválido.'),
    checkValidators
];

export const validateRestaurantIdForTables = [
    param('restaurantId')
        .isMongoId().withMessage('ID del restaurante inválido.'),
    checkValidators
];