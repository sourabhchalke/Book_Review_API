import express from 'express';
import { addReview, deleteReview, updateReview } from '../controllers/reviewController.js';
import authUser from '../middleware/authMiddleware.js';

const reviewRouter = express.Router();

reviewRouter.post('/fetchById/:id/reviews',authUser,addReview);
reviewRouter.put('/update/:id',authUser,updateReview);
reviewRouter.delete('/delete/:id',authUser,deleteReview);

export default reviewRouter;