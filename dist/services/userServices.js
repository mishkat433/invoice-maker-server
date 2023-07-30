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
exports.userServices = void 0;
const ApiError_1 = __importDefault(require("../error/ApiError"));
const userModel_1 = require("../models/userModel");
const http_status_1 = __importDefault(require("http-status"));
const userConstant_1 = require("../constant/userConstant");
const paginationHelper_1 = require("../helper/paginationHelper");
const jwtVerify_1 = require("../helper/jwtVerify");
const config_1 = __importDefault(require("../config"));
const email_1 = require("../helper/email");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const processToCreateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield userModel_1.User.exists({ email: data.email });
    if (userExist) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "user Email is already exists");
    }
    // jwt verification
    const token = jwtVerify_1.jwtValidation.createJsonWebToken(data, config_1.default.JWT_SECRET, '10m');
    // prepare email
    const emailData = {
        email: data.email,
        subject: 'Invoice Maker Activation email',
        html: `
        <h4> Hello ${data.name.firstName + ' ' + data.name.lastName}</h4>
        <p>Please click here to <a href="${config_1.default.CLINT_URL}/api/users/activate/${token}" target="_blank">activate your account.</a></p> `
    };
    (0, email_1.sendEmailWithNodeMailer)(emailData);
    return {
        token: token
    };
});
const crateUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "token not found");
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
    if (!decoded) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User was not able to verified");
    }
    const createUser = yield userModel_1.User.create(decoded.payload);
    if (!createUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "failed to create user");
    }
    return createUser;
});
const userFindById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userModel_1.User.findById(id, { password: 0 });
    if (!result) {
        throw new ApiError_1.default(400, "user does not exist with this id");
    }
    return result;
});
const getAllUser = (paginationOptions, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            // isAdmin: { $ne: true },
            $or: userConstant_1.userSearchAbleField.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        });
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const count = yield userModel_1.User.find(whereCondition).countDocuments();
    const { page, limit, skip, sortBy, sortOrder, nextPages, prevPage } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions, count);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const getAllUser = yield userModel_1.User.find(whereCondition, { passwords: 0 }).sort(sortConditions).skip(skip).limit(limit);
    return {
        meta: {
            page,
            limit,
            total: count,
            prevPage,
            nextPages
        },
        data: getAllUser
    };
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userModel_1.User.findOneAndUpdate({ _id: id }, payload, { new: true, runValidators: true, context: 'query' }).select({ password: 0 });
    if (!result) {
        throw new ApiError_1.default(400, "failed to update user");
    }
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUser = yield userModel_1.User.findByIdAndDelete({ _id: id, isAdmin: false });
    if (!deleteUser) {
        throw new ApiError_1.default(400, "cannot find user for delete");
    }
    return deleteUser;
});
exports.userServices = {
    processToCreateUser,
    crateUser,
    userFindById,
    getAllUser,
    updateUser,
    deleteUser
};
