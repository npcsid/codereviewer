import dotenv from 'dotenv';

dotenv.config();

type NodeEnv = 'development' | 'production' | 'test';

const parseNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const parseNodeEnv = (value: string | undefined): NodeEnv => {
  if (value === 'production' || value === 'test') {
    return value;
  }

  return 'development';
};

const parseCorsOrigins = (value: string | undefined): true | string[] => {
  if (!value || value.trim() === '*') {
    return true;
  }

  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
};

export const env = {
  nodeEnv: parseNodeEnv(process.env.NODE_ENV),
  port: parseNumber(process.env.PORT, 3000),
  corsOrigins: parseCorsOrigins(process.env.CORS_ORIGINS),
  rateLimitMax: parseNumber(process.env.RATE_LIMIT_MAX, 100),
  trustProxy: process.env.TRUST_PROXY === 'true',
} as const;
