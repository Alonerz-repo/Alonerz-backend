import { PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GroupQueryDto {
  @IsOptional()
  @IsNumber()
  x?: number;

  @IsOptional()
  @IsNumber()
  y?: number;
}

export class CreateGroupDto {
  @IsString()
  title: string;

  @IsString()
  menu: string;

  @IsString()
  description: string;

  @IsDate()
  startAt: Date;

  @IsDate()
  endAt: Date;

  @IsNumber()
  limit: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsNumber()
  locationX?: number;

  @IsNumber()
  locationY: number;

  @IsString()
  placeName: string;

  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  address2?: string;
}

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  comment: string;
}
