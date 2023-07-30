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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../helper/catchAsync"));
const sendResponse_1 = __importDefault(require("../helper/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const authServices_1 = require("../services/authServices");
const sendCookies_1 = __importDefault(require("../helper/sendCookies"));
const clearCookies_1 = __importDefault(require("../helper/clearCookies"));
const handleLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = __rest(req.body, []);
    const loginUser = yield authServices_1.authServices.loginUser(loginData);
    (0, sendResponse_1.default)((0, sendCookies_1.default)(res, loginUser.createAccessToken), {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User login successfully',
        data: loginUser.data
    });
}));
const handleLogOut = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const loginUser = await authServices.loginUser(loginData)
    (0, sendResponse_1.default)((0, clearCookies_1.default)(res), {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User logOut successfully',
    });
}));
const handleUpdatePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatePasswordData = __rest(req.body, []);
    const id = req.params.id;
    const updatePassword = yield authServices_1.authServices.updatePassword(updatePasswordData, id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Password update successfully',
        data: updatePassword
    });
}));
const handleForgetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const forgetPassword = yield authServices_1.authServices.forgetPassword(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Please go to your email(${email}) to forget your 'invoice maker' account. This link will be expired after 5 minutes`,
        data: forgetPassword.token
    });
}));
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resetPassData = __rest(req.body, []);
    const resetPass = yield authServices_1.authServices.resetPassword(resetPassData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Password reset successfully",
        data: resetPass
    });
}));
exports.authController = {
    handleLogin,
    handleLogOut,
    handleUpdatePassword,
    handleForgetPassword,
    resetPassword
};
