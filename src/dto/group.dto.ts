import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { GroupDtoSwagger } from 'src/swagger/group.swagger';

export class CreateGroupDto {
  @ApiProperty(GroupDtoSwagger.title)
  @IsString()
  title: string;

  @ApiProperty(GroupDtoSwagger.menu)
  @IsString()
  menu: string;

  @ApiProperty(GroupDtoSwagger.description)
  @IsString()
  description: string;

  @ApiProperty(GroupDtoSwagger.placeName)
  @IsString()
  placeName: string;

  @ApiProperty(GroupDtoSwagger.startAt)
  @IsDateString()
  startAt: Date;

  @ApiProperty(GroupDtoSwagger.endAt)
  @IsDateString()
  endAt: Date;

  @ApiProperty(GroupDtoSwagger.limit)
  @IsNumber()
  limit: number;

  @ApiProperty(GroupDtoSwagger.imageUrl)
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty(GroupDtoSwagger.locationX)
  @IsNumber()
  locationX: number;

  @ApiProperty(GroupDtoSwagger.locationY)
  @IsNumber()
  locationY: number;

  @ApiProperty(GroupDtoSwagger.address)
  @IsString()
  address: string;
}

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}
