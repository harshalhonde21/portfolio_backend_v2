import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from './error.middleware';
import { ROLES, Role } from '../constants';
import { Logger } from '../shared/services/logger';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, env.JWT_SECRET) as {
        id: string;
        role: Role;
      };

      req.user = decoded;
      next();
    } catch (error) {
      Logger.error('Token verification failed');
      return next(new AppError('Not authorized, token failed', 401));
    }
  }

  if (!token) {
    return next(new AppError('Not authorized, no token', 401));
  }
};

export const authorize = (...roles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('Not authorized to access this route', 403));
    }
    next();
  };
};
