import { IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { validMessage } from 'src/common/validation.message';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: validMessage.IsString('nickname') })
  @Length(2, 20, { message: validMessage.Length('nickname', 2, 20) })
  nickname: string;

  @IsOptional()
  @IsNumber({}, { message: validMessage.IsNumber('careerId') })
  careerId: number;

  @IsOptional()
  @IsString({ message: validMessage.IsString('year') })
  year: string;

  @IsOptional()
  @IsString({ message: validMessage.IsString('description') })
  description: string;
}
