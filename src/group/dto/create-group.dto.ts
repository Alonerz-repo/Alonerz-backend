import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ example: '그룹 제목' })
  @IsString()
  title: string;

  @ApiProperty({ example: '메뉴' })
  @IsString()
  menu: string;

  @ApiProperty({ example: '그룹 설명' })
  @IsString()
  description: string;

  @ApiProperty({ example: '모임 장소' })
  @IsString()
  placeName: string;

  @ApiProperty({ example: new Date() })
  @IsDateString()
  startAt: Date;

  @ApiProperty({ example: new Date() })
  @IsDateString()
  endAt: Date;

  @ApiProperty({ example: 3 })
  @IsNumber()
  limit: number;

  @ApiProperty({
    example:
      'https://github.com/choewy/react-place-app/blob/master/src/images/0.png?raw=true',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: 36.358361084097034 })
  @IsNumber()
  locationX: number;

  @ApiProperty({ example: 127.34540366949406 })
  @IsNumber()
  locationY: number;

  @ApiProperty({ example: '대전광역시 유성구 봉명동 629-2' })
  @IsString()
  address: string;
}
