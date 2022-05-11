import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    required: true,
    example: '퇴근 후 육회드시러 가실 백엔드 개발자 두 분 모십니다.',
  })
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
    example: '육회',
  })
  @IsString()
  menu: string;

  @ApiProperty({
    required: true,
    example: 'DM으로 연락처 공유드리겠습니다.',
  })
  @IsString()
  description: string;

  @ApiProperty({ required: true, example: '육회본가' })
  @IsString()
  placeName: string;

  @ApiProperty({ required: true, example: new Date() })
  @IsDate()
  startAt: Date;

  @ApiProperty({ required: true, example: new Date() })
  @IsDate()
  endAt: Date;

  @ApiProperty({ required: true, example: 3 })
  @IsNumber()
  limit: number;

  @ApiProperty({
    required: false,
    example:
      'https://github.com/choewy/react-place-app/blob/master/src/images/0.png?raw=true',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ required: true, example: 36.358361084097034 })
  @IsNumber()
  locationX: number;

  @ApiProperty({ required: false, example: 127.34540366949406 })
  @IsNumber()
  locationY: number;

  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  address2?: string;
}

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}
