import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { GroupProperty } from 'src/swagger/property/group.property';

export class CreateGroupDto {
  @ApiProperty(GroupProperty.title)
  @IsString()
  title: string;

  @ApiProperty(GroupProperty.menu)
  @IsString()
  menu: string;

  @ApiProperty(GroupProperty.description)
  @IsString()
  description: string;

  @ApiProperty(GroupProperty.placeName)
  @IsString()
  placeName: string;

  @ApiProperty(GroupProperty.startAt)
  @IsDateString()
  startAt: Date;

  @ApiProperty(GroupProperty.endAt)
  @IsDateString()
  endAt: Date;

  @ApiProperty(GroupProperty.limit)
  @IsNumber()
  limit: number;

  @ApiProperty(GroupProperty.imageUrl)
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty(GroupProperty.locationX)
  @IsNumber()
  locationX: number;

  @ApiProperty(GroupProperty.locationY)
  @IsNumber()
  locationY: number;

  @ApiProperty(GroupProperty.address)
  @IsString()
  address: string;
}

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}
