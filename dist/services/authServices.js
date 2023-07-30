"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../error/ApiError"));
const userModel_1 = require("../models/userModel");
const jwtVerify_1 = require("../helper/jwtVerify");
const config_1 = __importDefault(require("../config"));
const email_1 = require("../helper/email");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield userModel_1.User.findOne({ email });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "user does not exist with this email address, please signUp first");
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Email/password did not match");
    }
    if (user.isBanned) {
        throw new ApiError_1.default(http_status_1.default.UNPROCESSABLE_ENTITY, "You are banned, please contact authority");
    }
    const createAccessToken = jwtVerify_1.jwtValidation.createJsonWebToken(payload, config_1.default.JWT_SECRET, '7d');
    // const createRefreshToken = jwtValidation.createJsonWebToken(payload, config.JWT_SECRET, '7d')
    return {
        createAccessToken,
        data: user
    };
});
const logOut = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield userModel_1.User.findOne({ email });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "user does not exist with this email address, please signUp first");
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Email/password did not match");
    }
    if (user.isBanned) {
        throw new ApiError_1.default(http_status_1.default.UNPROCESSABLE_ENTITY, "You are banned, please contact authority");
    }
    const createAccessToken = jwtVerify_1.jwtValidation.createJsonWebToken(payload, config_1.default.JWT_SECRET, '10m');
    return {
        createAccessToken,
        data: user
    };
});
const updatePassword = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword, confirmPassword } = payload;
    if (newPassword !== confirmPassword) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "new password and confirmPassword are not the same");
    }
    if (newPassword === oldPassword) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Old password and new password are the same");
    }
    const user = yield userModel_1.User.findOne({ _id: id });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "user does not exist with this email address, please signUp first");
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "old password and new password do not match");
    }
    const result = yield userModel_1.User.findOneAndUpdate({ _id: id }, { password: newPassword }, { new: true, runValidators: true, context: 'query' }).select({ password: 0 });
    return result;
});
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.User.findOne({ email });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "user does not exist with this email address, please signUp first");
    }
    // jwt verification
    const token = jwtVerify_1.jwtValidation.createJsonWebToken({ email }, config_1.default.JWT_FORGET, '5m');
    // prepare email
    const emailData = {
        email,
        subject: 'Invoice Maker forget password email',
        html: `
     <h4> Hello ${user.name.firstName + ' ' + user.name.lastName}</h4>
     <p>Please click here to <a href="${config_1.default.CLINT_URL}/api/auth/forget-password/${token}" target="_blank">reset your password.</a></p> `
    };
    (0, email_1.sendEmailWithNodeMailer)(emailData);
    return {
        token: token
    };
});
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, newPassword, confirmPassword } = payload;
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "token not found");
    }
    if (newPassword !== confirmPassword) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "new password and confirm password are not the same");
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_FORGET);
    if (!decoded) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User was not able to reset password");
    }
    const user = yield userModel_1.User.findOne({ email: decoded.payload.email });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "user does not exist with this email address, please signUp first");
    }
    const result = yield userModel_1.User.findOneAndUpdate({ email: user.email }, { password: newPassword }, { new: true, runValidators: true, context: 'query' }).select({ password: 0 });
    return result;
});
exports.authServices = {
    loginUser,
    logOut,
    updatePassword,
    forgetPassword,
    resetPassword
};
