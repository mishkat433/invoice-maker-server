// import createError from 'http-errors';
import { Request, RequestHandler, Response } from "express"
// import responseHandler from "../error/responseHandler";
// import { User } from '../models/userModel';
// import ApiError from '../error/ApiError';
import catchAsync from '../helper/catchAsync';
import { userServices } from '../services/userServices';
import sendResponse from '../helper/sendResponse';
import { IUser } from '../interface/userInterface';
import httpStatus from 'http-status';
import pick from "../helper/pick";
import { userFilterableField } from "../constant/userConstant";
import { paginationField } from "../constant/pagination";
import { ITokenType } from "../interface/globalInstance";



const processCreateUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {

    const { ...createUserData } = req.body
    const result = await userServices.processToCreateUser(createUserData)

    sendResponse<ITokenType>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Please go to your email(${createUserData.email}) to complete your 'invoice maker' account. This link will be expired after 10 minutes`,
        data: result
    })
})


const activateUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {

    const token = req.body.token
    const result = await userServices.crateUser(token)

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully',
        data: result
    })
})

// const createUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {

//     const { ...createUserData } = req.body
//     const result = await userServices.crateUser(createUserData)

//     sendResponse<IUser>(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'User created successfully',
//         data: result
//     })
// })




export const getUserById: RequestHandler = catchAsync(async (req: Request, res: Response) => {

    const id = req.params.id;
    const result = await userServices.userFindById(id)

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User fetched successfully',
        data: result
    })

})


export const getAllUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, userFilterableField)

    const paginationOptions = pick(req.query, paginationField)

    const result = await userServices.getAllUser(paginationOptions, filters)

    sendResponse<IUser[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User fetched successfully',
        meta: result.meta,
        data: result.data
    })
})


export const updateUser: RequestHandler = catchAsync(async (req: Request, res: Response,) => {

    const id = req.params.id;
    const updateData = req.body

    const updateUser = await userServices.updateUser(id, updateData)

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User update successfully',
        data: updateUser
    })
})


export const deleteUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {

    const id = req.params.id;

    const deleteUser = await userServices.deleteUser(id)


    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User delete successfully',
        data: deleteUser
    })

})


export const userController = {
    processCreateUser,
    activateUser,
    // createUser,
    getUserById,
    getAllUser,
    deleteUser,
    updateUser
}