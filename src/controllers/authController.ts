import { Request, RequestHandler, Response } from "express"
import catchAsync from "../helper/catchAsync"
import sendResponse from "../helper/sendResponse"
import { IUser } from "../interface/userInterface"
import httpStatus from "http-status"
import { authServices } from "../services/authServices"
import sendCookies from "../helper/sendCookies"
import clearCookies from "../helper/clearCookies"

const handleLogin: RequestHandler = catchAsync(async (req: Request, res: Response) => {

    const { ...loginData } = req.body

    const loginUser = await authServices.loginUser(loginData)

    sendResponse<IUser>(sendCookies(res, loginUser.createAccessToken), {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User login successfully',
        data: loginUser.data
    })
})


const handleLogOut: RequestHandler = catchAsync(async (req: Request, res: Response) => {

    // const loginUser = await authServices.loginUser(loginData)

    sendResponse(clearCookies(res), {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logOut successfully',
    })
})


const handleUpdatePassword: RequestHandler = catchAsync(async (req: Request, res: Response) => {

    const { ...updatePasswordData } = req.body
    const id = req.params.id

    const updatePassword = await authServices.updatePassword(updatePasswordData, id)

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password update successfully',
        data: updatePassword
    })
})


const handleForgetPassword: RequestHandler = catchAsync(async (req: Request, res: Response) => {

    const email = req.body.email

    const forgetPassword = await authServices.forgetPassword(email)

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Please go to your email(${email}) to forget your 'invoice maker' account. This link will be expired after 5 minutes`,
        data: forgetPassword.token
    })
})


const resetPassword: RequestHandler = catchAsync(async (req: Request, res: Response) => {

    const { ...resetPassData } = req.body

    const resetPass = await authServices.resetPassword(resetPassData)

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password reset successfully",
        data: resetPass
    })
})




export const authController = {
    handleLogin,
    handleLogOut,
    handleUpdatePassword,
    handleForgetPassword,
    resetPassword
}