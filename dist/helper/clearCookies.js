"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clearCookies = (res) => {
    res.clearCookie('access_token');
    return res;
};
exports.default = clearCookies;
