import { Request, Response } from 'express';

export class AppController {
  swagger(_: Request, res: Response) {
    return res.redirect('/apis');
  }
}
