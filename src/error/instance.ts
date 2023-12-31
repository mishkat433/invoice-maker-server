

export type IGenericErrorMessage = {
    path: string | number;
    message: string;
}

export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[]
}


export type IGenericResponse<T> = {
    meta?: {
        page?: number,
        limit?: number,
        total: number,
        prevPage: number | null,
        nextPages: number | null,
    },
    data: T
}

export type IGenericResponseWithCookies<T> = {
    createAccessToken: string,
    data: T
}