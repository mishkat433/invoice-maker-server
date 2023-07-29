import express from 'express';
import { userController } from '../controllers/userController';
import { userValidation } from '../zodValidation/userZodValidation';
import validateRequest from '../validation/validateRequest';
// import isLoggedIn from '../validation/isLoginValidation';
const userRouter = express.Router();

userRouter.get('/', userController.getAllUser);
userRouter.get('/:id', userController.getUserById);

userRouter.post('/process-createUser', validateRequest(userValidation.createUserZodSchema), userController.processCreateUser)
userRouter.post('/verified', userController.activateUser)

userRouter.patch('/update-user/:id', validateRequest(userValidation.updateUserZodSchema), userController.updateUser)

userRouter.delete('/delete-user/:id', userController.deleteUser)


export const UserRoutes = userRouter;