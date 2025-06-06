import express from 'express';
import {addBook} from '../controllers/bookController.js';
import authUser from '../middleware/authMiddleware.js';
const bookRouter = express.Router();


bookRouter.post('/add',authUser,addBook);

export default bookRouter;
