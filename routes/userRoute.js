import express from 'express';
import {userSignUp} from '../controllers/authController.js'
const userRouter = express.Router();

userRouter.post('/signup',userSignUp);

export default userRouter;