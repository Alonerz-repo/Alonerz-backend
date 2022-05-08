import { Request, Response } from 'express';
import { Controller, Get } from '../common/decorator/application';

@Controller()
export class AppController {
  @Get()
  swagger(_: Request, res: Response) {
    return res.redirect('/apis');
  }

  @Get('test')
  test(_: Request, res: Response) {
    return res.send([]);
  }
}
