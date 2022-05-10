import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';
import { Double } from 'typeorm';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  menu: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  startAt: Date;

  @IsNotEmpty()
  @IsDate()
  endAt: Date;

  @IsNotEmpty()
  @IsNumber()
  limit: number;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  @IsNumber()
  locationX: Double;

  @IsNotEmpty()
  @IsNumber()
  locationY: Double;

  @IsNotEmpty()
  @IsString()
  placeName: string;

  @IsNotEmpty()
  @IsString()
  address1: string;

  @IsNotEmpty()
  @IsString()
  address2: string;
}
