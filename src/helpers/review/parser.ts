import {
  REVIEW_PARSE_ERROR_MESSAGE,
  ReviewLabel,
  ReviewSeverity,
} from '../../constants/review.constants.js';
import { ReviewFinding, ReviewPayload } from '../../types/review.types.js';

const isReviewLabel = (value: unknown): value is ReviewLabel =>
  value === ReviewLabel.Issue ||
  value === ReviewLabel.Warning ||
  value === ReviewLabel.Suggestion ||
  value === ReviewLabel.Nit;

export const parseReviewPayload = (raw: string): ReviewPayload => {
  const parsed = JSON.parse(raw) as {
    summary?: unknown;
    reviewFindings?: unknown;
    findings?: unknown;
  };
  const findingsSource = Array.isArray(parsed?.reviewFindings)
    ? parsed.reviewFindings
    : Array.isArray(parsed?.findings)
      ? parsed.findings
      : undefined;

  if (!parsed || !Array.isArray(parsed.summary) || !Array.isArray(findingsSource)) {
    throw new Error(REVIEW_PARSE_ERROR_MESSAGE);
  }

  return {
    summary: parsed.summary.map((item) => String(item)),
    reviewFindings: findingsSource.map((item) => {
      const finding = item as Partial<ReviewFinding>;
      // Overkill but fine to keep as is
      const severity =
        finding.severity === ReviewSeverity.High ||
        finding.severity === ReviewSeverity.Medium ||
        finding.severity === ReviewSeverity.Low
          ? finding.severity
          : ReviewSeverity.Low;

      // Overkill but fine to keep as is
      // If label is missing or invalid, derive a safe default from severity
      // to keep review rendering stable instead of dropping the finding.
      const label = isReviewLabel(finding.label)
        ? finding.label
        : severity === ReviewSeverity.High
          ? ReviewLabel.Issue
          : severity === ReviewSeverity.Medium
            ? ReviewLabel.Warning
            : ReviewLabel.Nit;

      return {
        label,
        severity,
        file: String(finding.file ?? ''),
        line: typeof finding.line === 'number' ? finding.line : null,
        message: String(finding.message ?? ''),
        suggestion: String(finding.suggestion ?? ''),
      };
    }),
  };
};
