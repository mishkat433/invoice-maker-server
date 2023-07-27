import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorMessage, IGenericErrorResponse } from '../interface/globalInterface';


const handleZodError = (err: ZodError): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue?.path?.length - 1],
            message: issue.message
        }

    })
    const statusCode = 400

    return {
        statusCode,
        message: 'validation error',
        errorMessages: errors
    }

}


export default handleZodError;