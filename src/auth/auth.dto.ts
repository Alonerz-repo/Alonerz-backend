import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AuthProperty } from 'src/common/swagger/property/auth.property';

export class AuthLoginDto {
  @ApiProperty(AuthProperty.kakaoId)
  @IsNotEmpty()
  @IsString()
  kakaoId: string;
}

export class RefreshTokenDto {
  @ApiProperty(AuthProperty.refreshToken)
  refreshToken: string;
}

export class Auth {
  @ApiProperty(AuthProperty.userId)
  userId: string;

  @ApiProperty(AuthProperty.kakaoId)
  kakaoId: number;

  @ApiProperty(AuthProperty.nickname)
  nickname: string;
}

export class AuthTokens {
  @ApiProperty(AuthProperty.accessToken)
  accessToken: string;

  @ApiProperty(AuthProperty.refreshToken)
  refreshToken: string;
}

export class AuthReissue extends AuthTokens {
  @ApiProperty(AuthProperty.auth)
  auth: Auth;
}
