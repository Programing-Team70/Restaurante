import { body } from "express-validator";
import { validateJWT } from "./validate-JWT.js";
import { checkValidators } from "./check-validators.js";

export const validateCreateMenu = [
    validateJWT,
    body('restaurant')
        .notEmpty()
        .withMessage('El restaurante es requerido.')
        .isMongoId()
        .withMessage('El ID del restaurante no es válido.'),
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre del plato es requerido.')
        .isLength({ max: 200 })
        .withMessage('El nombre del plato no puede exceder 200 caracteres.'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('La descripcion del plato es requerida.')
        .isLength({ max: 500 })
        .withMessage('La descripcion del plato no puede exceder 500 caracteres.'),
    body('ingredients')
        .isArray({ min: 1 })
        .withMessage('Debe agregar al menos un ingrediente.'),
    body('ingredients.*')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Cada ingrediente debe ser un texto válido.'),
    body('price')
        .notEmpty()
        .withMessage('El precio del plato es requerido.')
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser mayor o igual a 0.'),
    body('type')
        .notEmpty()
        .withMessage('El tipo del plato es requerido.')
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
    body('available')
        .optional()
        .isBoolean()
        .withMessage('El valor de disponibilidad debe ser verdadero o falso.'),
    checkValidators
];