import { Application, Request, Response, Router } from 'express';

const router = Router();
router.get('/', (_: Request, res: Response) => {
  return res.redirect('/apis');
});

export const AppController = (app: Application) => {
  app.use(router);
};
