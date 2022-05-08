import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/service/user.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}
}
