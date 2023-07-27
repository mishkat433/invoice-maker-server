import { Response } from "express";

const successResponse = (res: Response, { statusCode = 200, message = 'success', payload = {} }) => {
    return res.status(statusCode).json({
        success: true,
        message,
        payload
    })
}


const errorResponseHandler = (res: Response, { statusCode = 500, message = 'Internal server error' }) => {
    return res.status(statusCode).json({
        success: false,
        message
    })
}

export default { successResponse, errorResponseHandler };

