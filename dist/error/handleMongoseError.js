"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongooseError = (err) => {
    const errors = [
        {
            path: err.path,
            message: err.message
        }
    ];
    const statusCode = 401;
    return {
        statusCode,
        message: "User already Exist with this email id",
        errorMessages: errors
    };
};
exports.default = handleMongooseError;
