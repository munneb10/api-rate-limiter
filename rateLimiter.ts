import { Request, Response, NextFunction } from "express";

interface RequestRecord {
  timestamps: number[];
}

const requests: Record<string, RequestRecord> = {};
const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip ?? req.socket?.remoteAddress ?? "unknown";
  const now = Date.now();

  if (!requests[ip]) {
    requests[ip] = { timestamps: [] };
  }

  // remove old timestamps
  requests[ip].timestamps = requests[ip].timestamps.filter(
    (time) => now - time < WINDOW_SIZE
  );

  if (requests[ip].timestamps.length >= MAX_REQUESTS) {
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
    });
  }

  requests[ip].timestamps.push(now);
  next();
}
