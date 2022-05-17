import { IsString } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  readonly kakaoId: string;
}
