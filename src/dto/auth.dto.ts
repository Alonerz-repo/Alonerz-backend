import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  kakaoId: string;
}

export class RefreshTokenDto {
  refreshToken: string;
}
