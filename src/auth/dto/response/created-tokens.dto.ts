import { ApiResponseProperty } from '@nestjs/swagger';
import { Tokens } from 'src/auth/auth.interface';

export class CreatedTokensDto {
  @ApiResponseProperty()
  accessToken: string;

  @ApiResponseProperty()
  refreshToken: string;

  constructor(tokens: Tokens) {
    const { accessToken, refreshToken } = tokens;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
