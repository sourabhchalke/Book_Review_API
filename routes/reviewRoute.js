import express from 'express';
import { addReview } from '../controllers/reviewController.js';
import authUser from '../middleware/authMiddleware.js';

const reviewRouter = express.Router();

reviewRouter.post('/fetchById/:id/reviews',authUser,addReview);

export default reviewRouter;