import { HttpException } from '../exceptions';
import { NextFunction, Request, Response } from 'express';

export const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction): void => {
  console.log(err);

  const status = err.status || 500;
  const message = err.message || 'Sorry,please try again later';
  res.status(status).json({
    status,
    message,
  });
};
