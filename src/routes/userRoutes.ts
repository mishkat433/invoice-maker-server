import express from 'express';
import { userController } from '../controllers/userController';
import validateRequest from '../error/validateRequest';
import { userValidation } from '../zodValidation/userZodValidation';
const userRouter = express.Router();

userRouter.get('/', userController.getAllUser);
userRouter.get('/:id', userController.getUserById);

userRouter.post('/process-createUser', validateRequest(userValidation.createUserZodSchema), userController.processCreateUser)
userRouter.post('/verified', userController.activateUser)

userRouter.patch('/update-user/:id', validateRequest(userValidation.updateUserZodSchema), userController.updateUser)

userRouter.delete('/delete-user/:id', userController.deleteUser)


export const UserRoutes = userRouter;