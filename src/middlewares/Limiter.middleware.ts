import type { Request, Response, NextFunction } from 'express';

const WORDS_PER_DAY_LIMIT = 80000;

const wordCounts = new Map();

export const rateLimit = (req: Request, res: Response, next: NextFunction) => {
  const today = new Date().toISOString().slice(0, 10);
  const key = `${req.ip}-${today}`;

  const count = wordCounts.get(key) || 0;
  const words = req.body.trim().split(/\s+/).length;
  if (count + words > WORDS_PER_DAY_LIMIT) {
    return res.status(402).send('Payment Required');
  }
  wordCounts.set(key, count + words);

  return next();
};
