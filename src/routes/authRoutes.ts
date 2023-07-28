import express from 'express';
import { authController } from '../controllers/authController';
const userRouter = express.Router();


userRouter.post('/login', authController.handleLogin);
userRouter.post('/logOut', authController.handleLogOut);


export const authRoutes = userRouter;