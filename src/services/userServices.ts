import ApiError from "../error/ApiError"
import { User } from "../models/userModel"
import httpStatus from 'http-status';
import { IPaginationOptions, IUserFilters } from "../interface/pagination";
import { IGenericResponse } from "../error/instance";
import { IUser } from "../interface/userInterface";
import { userSearchAbleField } from "../constant/userConstant";
import { paginationHelper } from "../helper/paginationHelper";
import { SortOrder } from "mongoose";
import { jwtValidation } from "../helper/jwtVerify";
import config from "../config";
import { sendEmailWithNodeMailer } from "../helper/email";
import { ITokenType } from "../interface/globalInstance";
import jwt, { JwtPayload } from "jsonwebtoken"



const processToCreateUser = async (data: IUser): Promise<ITokenType> => {

    const userExist = await User.exists({ email: data.email })

    if (userExist) {
        throw new ApiError(httpStatus.CONFLICT, "user Email is already exists")
    }

    // jwt verification
    const token = jwtValidation.createJsonWebToken(data, config.JWT_SECRET, '10m')

    // prepare email
    const emailData = {
        email: data.email,
        subject: 'Invoice Maker Activation email',
        html: `
        <h4> Hello ${data.name.firstName + ' ' + data.name.lastName}</h4>
        <p>Please click here to <a href="${config.CLINT_URL}/api/users/activate/${token}" target="_blank">activate your account.</a></p> `
    }

    sendEmailWithNodeMailer(emailData)

    return {
        token: token
    }
}

const crateUser = async (token: string): Promise<IUser> => {


    if (!token) {
        throw new ApiError(httpStatus.BAD_REQUEST, "token not found")
    }

    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;

    if (!decoded) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User was not able to verified")
    }

    const createUser = await User.create(decoded.payload)

    if (!createUser) {
        throw new ApiError(httpStatus.BAD_REQUEST, "failed to create user")
    }
    return createUser
}


const userFindById = async (id: string): Promise<IUser> => {

    const result = await User.findById(id, { password: 0 })
    if (!result) {
        throw new ApiError(400, "user does not exist with this id")
    }
    return result
}



const getAllUser = async (paginationOptions: IPaginationOptions, filters: IUserFilters): Promise<IGenericResponse<IUser[]>> => {

    const { searchTerm, ...filtersData } = filters


    const andCondition = []

    if (searchTerm) {
        andCondition.push({
            // isAdmin: { $ne: true },
            $or: userSearchAbleField.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        })
    }


    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        })
    }


    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {}

    const count = await User.find(whereCondition).countDocuments()

    const { page, limit, skip, sortBy, sortOrder, nextPages, prevPage } = paginationHelper.calculatePagination(paginationOptions, count)

    const sortConditions: { [key: string]: SortOrder } = {}

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder
    }

    const getAllUser = await User.find(whereCondition, { passwords: 0 }).sort(sortConditions).skip(skip).limit(limit)

    return {
        meta: {
            page,
            limit,
            total: count,
            prevPage,
            nextPages
        },
        data: getAllUser
    }
}


const updateUser = async (id: string, payload: Partial<IUser>): Promise<IUser | null> => {


    const result = await User.findOneAndUpdate({ _id: id }, payload, { new: true, runValidators: true, context: 'query' }).select({ password: 0 });


    if (!result) {
        throw new ApiError(400, "failed to update user")
    }
    return result
}


const deleteUser = async (id: unknown) => {

    const deleteUser = await User.findByIdAndDelete({ _id: id, isAdmin: false })
    if (!deleteUser) {
        throw new ApiError(400, "cannot find user for delete")
    }
    return deleteUser
}

export const userServices = {
    processToCreateUser,
    crateUser,
    userFindById,
    getAllUser,
    updateUser,
    deleteUser
}