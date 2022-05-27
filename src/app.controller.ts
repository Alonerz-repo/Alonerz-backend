import { Controller, Logger, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class AppController {
  private logger = new Logger();
  @Post()
  index(@Req() req: Request) {
    const unknownRequest = {
      user: req.user,
      hostname: req.hostname,
    };
    this.logger.log(unknownRequest);
    return;
  }
}
