"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const successResponse = (res, { statusCode = 200, message = 'success', payload = {} }) => {
    return res.status(statusCode).json({
        success: true,
        message,
        payload
    });
};
const errorResponseHandler = (res, { statusCode = 500, message = 'Internal server error' }) => {
    return res.status(statusCode).json({
        success: false,
        message
    });
};
exports.default = { successResponse, errorResponseHandler };
