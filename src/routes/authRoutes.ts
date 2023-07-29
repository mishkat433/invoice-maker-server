import express from 'express';
import { authController } from '../controllers/authController';
import { authZodValidation } from '../zodValidation/authZodValidation';
import validateRequest from '../validation/validateRequest';

const userRouter = express.Router();


userRouter.post('/login', validateRequest(authZodValidation.userLoginZodValidation), authController.handleLogin);

userRouter.post('/logout', authController.handleLogOut);

userRouter.post('/update-password/:id', validateRequest(authZodValidation.userPasswordUpdateZodValidation), authController.handleUpdatePassword);

userRouter.post('/forget-password', validateRequest(authZodValidation.forgetPassZodValidation), authController.handleForgetPassword);

userRouter.post('/reset-password', authController.resetPassword);


export const authRoutes = userRouter;