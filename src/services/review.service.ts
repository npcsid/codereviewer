import { ReviewSummary } from '../models/review.model';

const dummyReviews: ReviewSummary[] = [
  { id: 'cr_001', repository: 'codereviewer/api', status: 'queued' },
  { id: 'cr_002', repository: 'codereviewer/web', status: 'completed' },
];

export const listReviews = (): ReviewSummary[] => dummyReviews;
