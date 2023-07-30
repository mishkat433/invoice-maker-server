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
exports.userController = exports.deleteUser = exports.updateUser = exports.getAllUser = exports.getUserById = void 0;
// import responseHandler from "../error/responseHandler";
// import { User } from '../models/userModel';
// import ApiError from '../error/ApiError';
const catchAsync_1 = __importDefault(require("../helper/catchAsync"));
const userServices_1 = require("../services/userServices");
const sendResponse_1 = __importDefault(require("../helper/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../helper/pick"));
const userConstant_1 = require("../constant/userConstant");
const pagination_1 = require("../constant/pagination");
const processCreateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createUserData = __rest(req.body, []);
    const result = yield userServices_1.userServices.processToCreateUser(createUserData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Please go to your email(${createUserData.email}) to complete your 'invoice maker' account. This link will be expired after 10 minutes`,
        data: result
    });
}));
const activateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    const result = yield userServices_1.userServices.crateUser(token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User created successfully',
        data: result
    });
}));
// const createUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
//     const { ...createUserData } = req.body
//     const result = await userServices.crateUser(createUserData)
//     sendResponse<IUser>(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'User created successfully',
//         data: result
//     })
// })
exports.getUserById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield userServices_1.userServices.userFindById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User fetched successfully',
        data: result
    });
}));
exports.getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, userConstant_1.userFilterableField);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationField);
    const result = yield userServices_1.userServices.getAllUser(paginationOptions, filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User fetched successfully',
        meta: result.meta,
        data: result.data
    });
}));
exports.updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateData = req.body;
    const updateUser = yield userServices_1.userServices.updateUser(id, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User update successfully',
        data: updateUser
    });
}));
exports.deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deleteUser = yield userServices_1.userServices.deleteUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User delete successfully',
        data: deleteUser
    });
}));
exports.userController = {
    processCreateUser,
    activateUser,
    // createUser,
    getUserById: exports.getUserById,
    getAllUser: exports.getAllUser,
    deleteUser: exports.deleteUser,
    updateUser: exports.updateUser
};
