import httpStatus from 'http-status';
import ApiError from '../error/ApiError';
import { IUser } from '../interface/userInterface';
import jwt from "jsonwebtoken"


const createJsonWebToken = (payload: Partial<IUser>, secretKey: string, expiresIn: string) => {


    if (typeof payload !== 'object' || !payload) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Payload must be an non empty object")
    }

    if (typeof secretKey !== 'string' || secretKey === '') {
        throw new ApiError(httpStatus.BAD_REQUEST, "secretKey must be an non empty string")
    }

    try {
        const token = jwt.sign({ payload }, secretKey, { expiresIn })
        return token
    }
    catch (err) {
        throw new ApiError(httpStatus.BAD_REQUEST, "jwt token is not created")
    }
}


export const jwtValidation = { createJsonWebToken }