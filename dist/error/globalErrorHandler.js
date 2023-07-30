"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const handleValidationError_1 = __importDefault(require("./handleValidationError"));
const ApiError_1 = __importDefault(require("./ApiError"));
const handleCastError_1 = __importDefault(require("./handleCastError"));
const handleZodError_1 = __importDefault(require("./handleZodError"));
const zod_1 = require("zod");
const handleMongoseError_1 = __importDefault(require("./handleMongoseError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "something went wrong";
    let errorMessages = [];
    if (err.name === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    if (err.name === "MongoServerError") {
        const simplifiedError = (0, handleMongoseError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (err instanceof ApiError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message) ? [{
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message
            }] : [];
    }
    else if (err.name === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (err instanceof Error) {
        statusCode = 400;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message) ? [{
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message
            }] : [];
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        error: errorMessages,
        stack: config_1.default.env !== 'production' ? err === null || err === void 0 ? void 0 : err.stack : undefined
    });
    next();
};
exports.default = globalErrorHandler;
