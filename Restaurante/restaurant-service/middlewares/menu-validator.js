import { body, param } from "express-validator";
import { checkValidators } from "./check-validators.js";

export const validateCreateMenu = [
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
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre del plato es requerido.')
        .isLength({ min: 3, max: 200 })
        .withMessage('El nombre debe tener entre 3 y 200 caracteres.'),
    body('description')
        .trim()
        .notEmpty().withMessage('La descripción del plato es requerida.')
        .isLength({ max: 500 })
        .withMessage('La descripción no puede exceder 500 caracteres.'),
    body('ingredients')
        .isArray({ min: 1 })
        .withMessage('Debe agregar al menos un ingrediente.'),
    body('ingredients.*')
        .isString()
        .trim()
        .notEmpty().withMessage('Cada ingrediente debe ser un texto válido.'),
    body('price')
        .notEmpty().withMessage('El precio del plato es requerido.')
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser un número mayor o igual a 0.')
        .customSanitizer(value => parseFloat(value).toFixed(2)),
    body('type')
        .notEmpty().withMessage('El tipo del plato es requerido.')
        .trim()
        .toLowerCase()
        .isIn([
            "entrada",
            "plato fuerte",
            "postre",
            "bebida",
            "acompañamiento",
            "combo",
            "otro"
        ])
        .withMessage('El tipo de plato no es válido.'),
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

export const validateUpdateMenu = [
    param('id')
        .isMongoId().withMessage('ID de plato no válido.'),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 3, max: 200 })
        .withMessage('El nombre debe tener entre 3 y 200 caracteres.'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('La descripción no puede exceder 500 caracteres.'),
    body('ingredients')
        .optional()
        .isArray({ min: 1 })
        .withMessage('Debe agregar al menos un ingrediente.'),
    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser un número mayor o igual a 0.')
        .customSanitizer(value => parseFloat(value).toFixed(2)),
    body('type')
        .optional()
        .trim()
        .toLowerCase()
        .isIn([
            "entrada", 
            "plato fuerte", 
            "postre", 
            "bebida", 
            "acompañamiento", 
            "combo", 
            "otro"
        ])
        .withMessage('El tipo de plato no es válido.'),
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

export const validateDesactivateMenu = [
    param('id')
        .isMongoId().withMessage('Formato invalido del ID.'),
    checkValidators
];

export const validateGetMenuByRestaurant = [
    param('restaurantId')
        .isMongoId().withMessage('El ID del restaurante no es válido.'),
    checkValidators
];

export const validateGetMenuItemById = [
    param('restaurantId')
        .isMongoId().withMessage('El ID del restaurante no es válido.'),
    checkValidators
];