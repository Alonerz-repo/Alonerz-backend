import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { GroupDtoSwagger } from 'src/swagger/group.swagger';

const transform = ({ value }) => {
  value ? value : undefined;
};

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

  // 현재를 기준으로 미래여야 하고
  @ApiProperty(GroupDtoSwagger.startAt)
  @IsDateString()
  startAt: Date;

  // startAt보다는 적어도 30분 정도 빠르게 설정
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

  @ApiProperty(GroupDtoSwagger.address1)
  @IsString()
  address1: string;

  @ApiProperty(GroupDtoSwagger.address2)
  @IsOptional()
  @IsString()
  address2?: string;
}

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}
