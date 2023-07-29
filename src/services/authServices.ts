import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import httpStatus from "http-status";
import ApiError from "../error/ApiError";
import { IAuthLogin, IAuthUpdatePassword, IResetType } from "../interface/authInterface";
import { User } from "../models/userModel";
import { jwtValidation } from '../helper/jwtVerify';
import config from '../config';
import { IGenericResponseWithCookies } from '../error/instance';
import { IUser } from '../interface/userInterface';
import { sendEmailWithNodeMailer } from '../helper/email';
import { ITokenType } from '../interface/globalInstance';

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

    const createAccessToken = jwtValidation.createJsonWebToken(payload, config.JWT_SECRET, '7d')

    // const createRefreshToken = jwtValidation.createJsonWebToken(payload, config.JWT_SECRET, '7d')


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


const updatePassword = async (payload: IAuthUpdatePassword, id: string): Promise<IUser | null> => {

    const { oldPassword, newPassword, confirmPassword } = payload;

    if (newPassword !== confirmPassword) {
        throw new ApiError(httpStatus.BAD_REQUEST, "new password and confirmPassword are not the same")
    }

    if (newPassword === oldPassword) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Old password and new password are the same")
    }

    const user = await User.findOne({ _id: id })

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "user does not exist with this email address, please signUp first")
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)

    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.BAD_REQUEST, "old password and new password do not match")
    }

    const result = await User.findOneAndUpdate({ _id: id }, { password: newPassword }, { new: true, runValidators: true, context: 'query' }).select({ password: 0 });

    return result

}


const forgetPassword = async (email: string): Promise<ITokenType> => {

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "user does not exist with this email address, please signUp first")
    }

    // jwt verification
    const token = jwtValidation.createJsonWebToken({ email }, config.JWT_FORGET, '5m')

    // prepare email
    const emailData = {
        email,
        subject: 'Invoice Maker forget password email',
        html: `
     <h4> Hello ${user.name.firstName + ' ' + user.name.lastName}</h4>
     <p>Please click here to <a href="${config.CLINT_URL}/api/auth/forget-password/${token}" target="_blank">reset your password.</a></p> `
    }

    sendEmailWithNodeMailer(emailData)

    return {
        token: token
    }

}


const resetPassword = async (payload: IResetType): Promise<IUser | null> => {

    const { token, newPassword, confirmPassword } = payload

    if (!token) {
        throw new ApiError(httpStatus.BAD_REQUEST, "token not found")
    }

    if (newPassword !== confirmPassword) {
        throw new ApiError(httpStatus.BAD_REQUEST, "new password and confirm password are not the same")
    }

    const decoded = jwt.verify(token, config.JWT_FORGET) as JwtPayload;

    if (!decoded) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User was not able to reset password")
    }

    const user = await User.findOne({ email: decoded.payload.email })

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "user does not exist with this email address, please signUp first")
    }

    const result = await User.findOneAndUpdate({ email: user.email }, { password: newPassword }, { new: true, runValidators: true, context: 'query' }).select({ password: 0 });



    return result

}


export const authServices = {
    loginUser,
    logOut,
    updatePassword,
    forgetPassword,
    resetPassword
}