import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  title: string;

  @IsString()
  menu: string;

  @IsString()
  description: string;

  @IsString()
  placeName: string;

  @IsDate()
  startAt: Date;

  @IsDate()
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
