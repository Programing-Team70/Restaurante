export const errorHandler = (err, req, res, next) => {
    // Logging refinado
    console.error(`[Error] ${req.method} ${req.path} - ${err.message}`);
    
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((error) => ({
            field: error.path,
            message: error.message,
        }));

        return res.status(400).json({
            success: false,
            message: 'Error de validación en los datos enviados',
            errors,
            errorType: 'VALIDATION_ERROR'
        });
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            success: false,
            message: `El valor para el campo '${field}' ya existe en el sistema`,
            errorType: 'DUPLICATE_FIELD',
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: `El ID proporcionado no tiene un formato válido`,
            errorType: 'INVALID_ID',
        });
    }

    const businessErrors = [
        "ya tiene una reservación activa",
        "no existe",
        "ya no está activa",
        "ya está cancelada"
    ];

    if (businessErrors.some(msg => err.message.includes(msg))) {
        return res.status(400).json({
            success: false,
            message: err.message,
            errorType: 'BUSINESS_LOGIC_ERROR'
        });
    }

    // 5. Error por defecto (500 Internal Server Error)
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: statusCode === 500 ? 'Error interno del servidor.' : err.message,
        errorType: err.code || 'INTERNAL_SERVER_ERROR',
        ...(process.env.NODE_ENV === 'development' && {
            details: err.message,
            stack: err.stack,
        }),
    });
};