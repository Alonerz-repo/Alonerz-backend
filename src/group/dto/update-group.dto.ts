import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { validMessage } from 'src/common/validation.message';

export class UpdateGroupDto {
  @IsOptional()
  @IsString({ message: validMessage.IsString('title') })
  readonly title: string;

  @IsOptional()
  @IsNumber({}, { message: validMessage.IsNumber('categoryId') })
  readonly categoryId: number;

  @IsOptional()
  @IsString({ message: validMessage.IsString('description') })
  readonly description: string;

  @IsOptional()
  @IsString({ message: validMessage.IsString('placeName') })
  readonly placeName: string;

  @IsOptional()
  @IsDate({ message: validMessage.IsDate('startAt') })
  readonly startAt: Date;

  @IsOptional()
  @IsDate({ message: validMessage.IsDate('endAt') })
  readonly endAt: Date;

  @IsOptional()
  @IsNumber({}, { message: validMessage.IsNumber('limit') })
  readonly limit: number;

  @IsOptional()
  @IsNumber({}, { message: validMessage.IsNumber('locationX') })
  readonly locationX: number;

  @IsOptional()
  @IsNumber({}, { message: validMessage.IsNumber('locationY') })
  readonly locationY: number;

  @IsOptional()
  @IsString({ message: validMessage.IsString('placeName') })
  readonly address: string;
}
