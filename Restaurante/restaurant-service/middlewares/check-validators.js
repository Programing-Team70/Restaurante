import { validationResult } from "express-validator";

export const checkValidators = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
        return res.status(400).jason({
            success: false,
            message: 'Error: No se pudo validar la peticion.',
            errors: errors.array().map(err => ({
                field: err.path || err.param,
                message: err.msg
            }))
        })
    }
    next();
}