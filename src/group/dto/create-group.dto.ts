import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { validMessage } from 'src/common/validation.message';

export class CreateGroupDto {
  @IsNotEmpty({ message: validMessage.IsNotEmpty('title') })
  @IsString({ message: validMessage.IsString('title') })
  readonly title: string;

  @IsNotEmpty({ message: validMessage.IsNotEmpty('menu') })
  @IsString({ message: validMessage.IsString('menu') })
  readonly menu: string;

  @IsNotEmpty({ message: validMessage.IsNotEmpty('description') })
  @IsString({ message: validMessage.IsString('description') })
  readonly description: string;

  @IsNotEmpty({ message: validMessage.IsNotEmpty('placeName') })
  @IsString({ message: validMessage.IsString('placeName') })
  readonly placeName: string;

  @IsNotEmpty({ message: validMessage.IsNotEmpty('startAt') })
  @IsDate({ message: validMessage.IsDate('startAt') })
  readonly startAt: Date;

  @IsNotEmpty({ message: validMessage.IsNotEmpty('endAt') })
  @IsDate({ message: validMessage.IsDate('endAt') })
  readonly endAt: Date;

  @IsNotEmpty({ message: validMessage.IsNotEmpty('limit') })
  @IsNumber({}, { message: validMessage.IsNumber('limit') })
  readonly limit: number;

  @IsNotEmpty({ message: validMessage.IsNotEmpty('locationX') })
  @IsNumber({}, { message: validMessage.IsNumber('locationX') })
  readonly locationX: number;

  @IsNotEmpty({ message: validMessage.IsNotEmpty('locationY') })
  @IsNumber({}, { message: validMessage.IsNumber('locationY') })
  readonly locationY: number;

  @IsNotEmpty({ message: validMessage.IsNotEmpty('address') })
  @IsString({ message: validMessage.IsString('placeName') })
  readonly address: string;
}
