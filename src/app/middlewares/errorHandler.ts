import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const errorHandler = (
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  res.sendStatus(500);
};
