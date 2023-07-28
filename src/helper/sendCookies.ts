import { Response } from "express";


const sendCookies = (res: Response, token: string): Response<Record<string, unknown>> => {
    res.cookie('access_token', token, {
        maxAge: 15000,
        httpOnly: true,
        secure: true
    })

    return res;
}

export default sendCookies;