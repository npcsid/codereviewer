export interface ReviewSummary {
  id: string;
  repository: string;
  status: 'queued' | 'completed';
}
