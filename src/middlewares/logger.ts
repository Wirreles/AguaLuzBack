import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../common/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const message = `Método ${req.method} - Ruta: ${req.originalUrl}`;
    logger.info(message);
    next();
  }
}

// Middleware Global
export function LoggerGlobalMiddleware(req: Request, res: Response, next: NextFunction) {
  const now = new Date();
  const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  const message = `Middleware Global: método ${req.method} a la ruta ${req.url} - ${formattedDate}`;

  logger.info(message);
  next();
}
