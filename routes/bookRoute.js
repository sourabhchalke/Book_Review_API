import express from 'express';
import {addBook,getBooks,getBookById, searchBook} from '../controllers/bookController.js';
import authUser from '../middleware/authMiddleware.js';
const bookRouter = express.Router();


bookRouter.post('/add',authUser,addBook);
bookRouter.get('/fetch',getBooks);
bookRouter.get('/fetchById/:id',getBookById);
bookRouter.get('/search',searchBook);

export default bookRouter;
