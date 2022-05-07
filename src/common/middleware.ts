import { NextFunction, Request, Response } from 'express';

interface MiddlewareFunction {
  (req: Request, res: Response, next?: NextFunction): any;
}

export function Middleware(meddleware: MiddlewareFunction) {
  return function (target: any, key: any, desc: any) {
    const route = desc.value;
    desc.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      meddleware(req, res, () => route(req, res, next));
    };
  };
}
