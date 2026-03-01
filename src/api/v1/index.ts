import { Router } from 'express';
import { healthRoutes } from '../../routes/health.routes';
import { reviewRoutes } from '../../routes/review.routes';

export const v1Router = Router();

v1Router.use('/health', healthRoutes);
v1Router.use('/reviews', reviewRoutes);
