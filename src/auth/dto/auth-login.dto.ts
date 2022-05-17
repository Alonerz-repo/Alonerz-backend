import { IsNotEmpty, IsString } from 'class-validator';
import { validMessage } from 'src/common/validation.message';

export class AuthLoginDto {
  @IsNotEmpty({ message: validMessage.IsNotEmpty('kakaoId') })
  @IsString({ message: validMessage.IsString('kakaoId') })
  readonly kakaoId: string;
}
