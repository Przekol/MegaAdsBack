import { HttpException } from '../exceptions';
import { NextFunction, Request, Response } from 'express';
import { ClientApiResponse } from 'types';

export const errorMiddleware = (
  err: HttpException,
  req: Request<never, ClientApiResponse<null>, never>,
  res: Response<ClientApiResponse<null>>,
  next: NextFunction,
): void => {
  const status = err.status || 500;
  const message = err.message || 'Sorry,please try again later';

  console.log({
    status,
    message,
    timestamp: new Date().toISOString(),
    path: req.url,
  });

  res.status(status).json({
    ok: false,
    error: message,
    status,
  });
};
