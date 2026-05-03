const { check } = require('express-validator');
const checkValidators = require('./check-validators');

const validateReport = [
    check('start', 'La fecha de inicio debe ser válida')
        .optional()
        .isISO8601(),

    check('end', 'La fecha final debe ser válida')
        .optional()
        .isISO8601(),

    check('end').custom((value, { req }) => {
        if (req.query.start && value) {
            const start = new Date(req.query.start);
            const end = new Date(value);

            if (start > end) {
                throw new Error('La fecha de inicio no puede ser mayor a la final');
            }
        }
        return true;
    }),

    checkValidators
];

module.exports = validateReport;