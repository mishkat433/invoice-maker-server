"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authZodValidation_1 = require("../zodValidation/authZodValidation");
const validateRequest_1 = __importDefault(require("../validation/validateRequest"));
const userRouter = express_1.default.Router();
userRouter.post('/login', (0, validateRequest_1.default)(authZodValidation_1.authZodValidation.userLoginZodValidation), authController_1.authController.handleLogin);
userRouter.post('/logout', authController_1.authController.handleLogOut);
userRouter.post('/update-password/:id', (0, validateRequest_1.default)(authZodValidation_1.authZodValidation.userPasswordUpdateZodValidation), authController_1.authController.handleUpdatePassword);
userRouter.post('/forget-password', (0, validateRequest_1.default)(authZodValidation_1.authZodValidation.forgetPassZodValidation), authController_1.authController.handleForgetPassword);
userRouter.post('/reset-password', authController_1.authController.resetPassword);
exports.authRoutes = userRouter;
