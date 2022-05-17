import { IsString } from 'class-validator';

export class AuthReissueDto {
  @IsString()
  refreshToken: string;
}
