import { Response } from "express";


const sendCookies = (res: Response, token: string): Response<Record<string, unknown>> => {
    res.cookie('access_token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
    })

    return res;
}

export default sendCookies;