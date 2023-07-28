import { Response } from "express";


const clearCookies = (res: Response): Response<Record<string, unknown>> => {
    res.clearCookie('access_token')
    return res;
}

export default clearCookies;