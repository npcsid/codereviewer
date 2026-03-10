import { Request, Response } from 'express';

export const getReviews = (_req: Request, res: Response): void => {
  res.status(200).json({ data: null });
};
