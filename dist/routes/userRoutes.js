"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userZodValidation_1 = require("../zodValidation/userZodValidation");
const validateRequest_1 = __importDefault(require("../validation/validateRequest"));
// import isLoggedIn from '../validation/isLoginValidation';
const userRouter = express_1.default.Router();
userRouter.get('/', userController_1.userController.getAllUser);
userRouter.get('/:id', userController_1.userController.getUserById);
userRouter.post('/process-createUser', (0, validateRequest_1.default)(userZodValidation_1.userValidation.createUserZodSchema), userController_1.userController.processCreateUser);
userRouter.post('/verified', userController_1.userController.activateUser);
userRouter.patch('/update-user/:id', (0, validateRequest_1.default)(userZodValidation_1.userValidation.updateUserZodSchema), userController_1.userController.updateUser);
userRouter.delete('/delete-user/:id', userController_1.userController.deleteUser);
exports.UserRoutes = userRouter;
