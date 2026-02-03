import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { AppError } from './error.middleware';

export const validate =
  (schema: ZodSchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.parseAsync({
          body: req.body,
          query: req.query,
          params: req.params,
        });
        return next();
      } catch (error) {
        if (error instanceof ZodError) {
          // Collect all error messages
          const message = error.issues.map((e: any) => e.message).join(', ');
          return next(new AppError(message, 400));
        }
        return next(error);
      }
    };
