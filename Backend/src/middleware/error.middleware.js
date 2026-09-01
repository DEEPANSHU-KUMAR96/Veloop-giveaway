const errorMiddleware = (err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    console.error(err.stack);

    // Mongoose duplicate key error (e.g. user joining same giveaway twice)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            success: false,
            message: `Duplicate entry detected for field: ${field}`
        });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: messages
        });
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }

    // Default server error
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};

export default errorMiddleware;