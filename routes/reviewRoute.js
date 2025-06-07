import express from 'express';
import { addReview, updateReview } from '../controllers/reviewController.js';
import authUser from '../middleware/authMiddleware.js';

const reviewRouter = express.Router();

reviewRouter.post('/fetchById/:id/reviews',authUser,addReview);
reviewRouter.put('/views/:id',authUser,updateReview);

export default reviewRouter;