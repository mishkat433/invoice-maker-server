/* eslint-disable no-undefined */
import { IGenericErrorMessage } from "./instance";
import config from "../config";
import handleValidationError from "./handleValidationError";
import { ErrorRequestHandler } from "express";
import ApiError from "./ApiError";
import handleCastError from "./handleCastError";
import handleZodError from "./handleZodError";
import { ZodError } from "zod";
import handleMongooseError from "./handleMongoseError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    let statusCode = 500;
    let message = "something went wrong";
    let errorMessages: IGenericErrorMessage[] = []


    if (err.name === "ValidationError") {
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorMessages = simplifiedError.errorMessages
    }
    if (err.name === "MongoServerError") {
        const simplifiedError = handleMongooseError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorMessages = simplifiedError.errorMessages
    }
    else if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorMessages = simplifiedError.errorMessages
    }
    else if (err instanceof ApiError) {
        statusCode = err.statusCode
        message = err.message
        errorMessages = err?.message ? [{
            path: "",
            message: err?.message
        }] : []
    }
    else if (err.name === 'CastError') {
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorMessages = simplifiedError.errorMessages
    }
    else if (err instanceof Error) {
        statusCode = 400;
        message = err?.message;
        errorMessages = err?.message ? [{
            path: '',
            message: err?.message
        }] : []
    }


    res.status(statusCode).json({
        success: false,
        message: message,
        error: errorMessages,
        stack: config.env !== 'production' ? err?.stack : undefined
    })

    next()
}

export default globalErrorHandler;