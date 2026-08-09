"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
// Centralized error handling middleware
const errorMiddleware = (err, req, res, _next) => {
    void _next;
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        error.message = err.message; // Ensure message is copied
        // Handle specific error types
        if (error.code === 'P2025') { // Prisma record not found error
            error = new appError_1.default('Resource not found.', 404);
        }
        // Add other specific error handlers here (e.g., validation errors, JWT errors)
        sendErrorProd(error, res);
    }
};
exports.errorMiddleware = errorMiddleware;
const sendErrorDev = (err, res) => {
    console.error('ERROR 💥', err);
    res.status(err.statusCode || 500).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode || 500).json({ status: err.status, message: err.message });
    }
    else {
        console.error('ERROR 💥', err);
        res.status(500).json({ status: 'error', message: 'Something went very wrong!' });
    }
};
//# sourceMappingURL=error.middleware.js.map