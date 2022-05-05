import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  title: string;

  @IsString()
  menu: string;

  @IsDateString()
  startAt: Date;

  @IsDateString()
  endAt: Date;

  @IsNumber()
  memberLimit: number;

  @IsString()
  description: string;

  @IsOptional()
  imageUrl?: string;
}
