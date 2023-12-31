import mongoose from "mongoose";
import { IGenericErrorMessage, IGenericErrorResponse } from "./instance";

const handleValidationError = (err: mongoose.Error.ValidationError): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = Object.values(err.errors).map((el: mongoose.Error.CastError | mongoose.Error.ValidatorError) => {
        return {
            path: el?.path,
            message: el?.message
        }
    })
    const statusCode = 400
    return {
        statusCode,
        message: "validation error",
        errorMessages: errors
    }
}


export default handleValidationError;
