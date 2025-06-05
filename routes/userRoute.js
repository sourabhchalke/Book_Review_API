import express from 'express';
import {userSignIn, userSignUp} from '../controllers/authController.js'
const userRouter = express.Router();

userRouter.post('/signup',userSignUp);
userRouter.post('/signin',userSignIn);

export default userRouter;