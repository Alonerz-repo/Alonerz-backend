import { NextFunction, Request, Response } from 'express';
import { Middleware } from '../common/middleware';

const test = (req: Request, res: Response, next: NextFunction) => {
  console.log('test');
  next();
};

export class AppController {
  @Middleware(test)
  swagger(_: Request, res: Response) {
    return res.redirect('/apis');
  }
}
