import { NextFunction, Request, Response } from "express"
import { User } from "../models/userModel";


export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getUser = await User.find()
        res.status(200).send({
            success: true,
            message: "user get successful",
            data: getUser
        })
    }
    catch (err) {
        next(err);
    }
}


export const createUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userCreate = await User.create(req.body)
        res.status(200).send({
            success: true,
            message: "User created successfully",
            data: userCreate
        })
    }
    catch (err) {
        next(err);
    }
}