import mongoose from "mongoose"
import { IGenericErrorMessage, IGenericErrorResponse } from "./instance"




const handleCastError = (err: mongoose.Error.CastError): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = [
        {
            path: err.path,
            message: "Invalid Id"
        }
    ]

    const statusCode = 400
    return {
        statusCode,
        message: "Cast error",
        errorMessages: errors
    }
}

export default handleCastError;