import { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError";

const isLoggedIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {

        const token = await req.cookies.access_token
        console.log(token);
        if (!token) {
            throw new ApiError(403, "Access token")
        }

        return next()
    } catch (error) {
        next(error)
    }

}

export default isLoggedIn