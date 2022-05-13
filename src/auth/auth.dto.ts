import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ example: '000001' })
  @IsNotEmpty()
  @IsString()
  kakaoId: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: '' })
  refreshToken: string;
}
