import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";
import { logger } from "./logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

    if (req.path === "/metrics") {
        return next();
    }

  const start = Date.now();
  const requestId = uuid();

  res.setHeader("X-Request-Id", requestId);

  res.on("finish", () => {

    const duration = Date.now() - start;

    logger.info({
      timestamp: new Date().toISOString(),
      requestId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      duration
    });

  });

  next();
};