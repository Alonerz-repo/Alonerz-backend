import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get('/alonerz')
  index(@Res() res: Response) {
    return res.sendFile('index.html');
  }
}
