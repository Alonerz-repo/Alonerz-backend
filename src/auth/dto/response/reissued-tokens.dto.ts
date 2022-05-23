import { ApiResponseProperty } from '@nestjs/swagger';
import { Tokens } from 'src/auth/auth.interface';
import { User } from 'src/user/user.entity';
import { AuthDto } from './auth.dto';
import { PayloadDto } from './payload.dto';

export class ReissuedTokensDto {
  @ApiResponseProperty()
  accessToken: string;

  @ApiResponseProperty()
  refreshToken: string;

  @ApiResponseProperty()
  auth: AuthDto;

  constructor(tokens: Tokens, user: User) {
    const { accessToken, refreshToken } = tokens;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.auth = new PayloadDto(user).auth;
  }
}
