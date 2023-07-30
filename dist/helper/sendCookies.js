"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendCookies = (res, token) => {
    res.cookie('access_token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
    });
    return res;
};
exports.default = sendCookies;
