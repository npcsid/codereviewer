import { Router } from 'express';
import { getReviews } from '../controllers/review.controller';

export const reviewRoutes = Router();

reviewRoutes.get('/', getReviews);
