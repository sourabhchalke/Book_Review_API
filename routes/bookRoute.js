import express from 'express';
import {addBook,getBooks} from '../controllers/bookController.js';
import authUser from '../middleware/authMiddleware.js';
const bookRouter = express.Router();


bookRouter.post('/add',authUser,addBook);
bookRouter.get('/fetch',getBooks);

export default bookRouter;
