import { Request, Response } from 'express';

export class AppController {
  async swagger(_: Request, res: Response) {
    return res.redirect('/api');
  }
}
