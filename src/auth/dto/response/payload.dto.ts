import { ApiResponseProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { AuthDto } from './auth.dto';

export class PayloadDto {
  @ApiResponseProperty()
  auth: AuthDto;

  constructor(user: User) {
    this.auth = new AuthDto(user);
  }
}
