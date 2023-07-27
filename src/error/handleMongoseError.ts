import mongoose from "mongoose";
import { IGenericErrorMessage, IGenericErrorResponse } from "./instance";

const handleMongooseError = (err: mongoose.Error.ValidatorError): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = [
        {
            path: err.path,
            message: err.message
        }
    ]

    const statusCode = 401
    return {
        statusCode,
        message: "User already Exist with this email id",
        errorMessages: errors
    }
}


export default handleMongooseError;
