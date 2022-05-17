import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  title: string;

  @IsString()
  menu: string;

  @IsString()
  description: string;

  @IsString()
  placeName: string;

  @IsDateString()
  startAt: Date;

  @IsDateString()
  endAt: Date;

  @IsNumber()
  limit: number;

  @IsNumber()
  locationX: number;

  @IsNumber()
  locationY: number;

  @IsString()
  address: string;
}
