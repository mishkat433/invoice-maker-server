import express from 'express';
import { createUser, getUser } from '../controllers/userController';
const userRouter = express.Router();

userRouter.get('/', getUser);

userRouter.post('/create-user', createUser)


export const UserRoutes = userRouter;