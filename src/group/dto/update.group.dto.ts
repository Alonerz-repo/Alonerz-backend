import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGroupDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  menu?: string;

  @IsOptional()
  @IsDateString()
  startAt?: Date;

  @IsOptional()
  @IsDateString()
  endAt?: Date;

  @IsOptional()
  @IsNumber()
  memberLimit?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
