import { IsNotEmpty, IsString } from 'class-validator';
import { validMessage } from 'src/common/validation.message';

export class AuthReissueDto {
  @IsNotEmpty({ message: validMessage.IsNotEmpty('refreshToken') })
  @IsString({ message: validMessage.IsString('refreshToken') })
  readonly refreshToken: string;
}
