import { NextFunction, Request, Response } from 'express';
import { NotFoundException } from '../exceptions';

export const notFoundMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundException());
};
