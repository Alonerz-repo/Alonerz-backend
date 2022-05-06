import { Request, Response, Router } from 'express';
import { AppController } from './controller/app.controller';

const Routes = [
  {
    method: 'get',
    route: '/',
    controller: AppController,
    action: 'swagger',
  },
];

export const routes = (() => {
  const router = Router();

  Routes.forEach((route) => {
    router[route.method](
      route.route,
      (req: Request, res: Response, next: Function) => {
        const result = new route.controller()[route.action](req, res, next);
        if (result instanceof Promise) {
          result.then((result) =>
            result !== null && result !== undefined
              ? res.send(result)
              : undefined
          );
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      }
    );
  });

  return router;
})();