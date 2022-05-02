import { IsString } from 'class-validator';

export class KakaoUserDto {
  kakaoId: number;

  @IsString()
  kakaoEmail: string;

  @IsString()
  profileImageUrl: string;

  @IsString()
  password: string;
}
