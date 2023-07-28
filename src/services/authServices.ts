import bcrypt from 'bcryptjs';
import httpStatus from "http-status";
import ApiError from "../error/ApiError";
import { IAuthLogin } from "../interface/authInterface";
import { User } from "../models/userModel";
import { jwtValidation } from '../helper/jwtVerify';
import config from '../config';
import { IGenericResponseWithCookies } from '../error/instance';
import { IUser } from '../interface/userInterface';
// import { IGenericResponse } from "../error/instance";


const loginUser = async (payload: IAuthLogin): Promise<IGenericResponseWithCookies<IUser>> => {

    const { email, password } = payload;

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "user does not exist with this email address, please signUp first")
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email/password did not match")
    }

    if (user.isBanned) {
        throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "You are banned, please contact authority")
    }

    const createAccessToken = jwtValidation.createJsonWebToken(payload, config.JWT_SECRET, '10m')


    return {
        createAccessToken,
        data: user
    }

}


const logOut = async (payload: IAuthLogin): Promise<IGenericResponseWithCookies<IUser>> => {

    const { email, password } = payload;

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "user does not exist with this email address, please signUp first")
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email/password did not match")
    }

    if (user.isBanned) {
        throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "You are banned, please contact authority")
    }

    const createAccessToken = jwtValidation.createJsonWebToken(payload, config.JWT_SECRET, '10m')


    return {
        createAccessToken,
        data: user
    }

}


export const authServices = {
    loginUser,
    logOut
}