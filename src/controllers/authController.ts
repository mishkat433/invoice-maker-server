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
        data: []
    })
})




export const authController = {
    handleLogin,
    handleLogOut,
}