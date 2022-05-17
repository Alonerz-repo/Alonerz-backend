import { ApiProperty } from '@nestjs/swagger';
import { Block } from 'src/block/block.entity';
import { Follow } from 'src/follow/follow.entity';
import { Point } from 'src/point/point.entity';

export class UserInfoRow {
  @ApiProperty({ example: '000001' })
  userId: string;

  @ApiProperty({ example: 'alonerz' })
  nickname: string;

  @ApiProperty({ example: null })
  imageUrl: string;

  @ApiProperty({ example: '신입' })
  year: string;

  @ApiProperty({ example: '신입 백엔드 개발자입니다.' })
  description: string;

  @ApiProperty({ example: 1 })
  careerId: number;

  @ApiProperty({ example: 200 })
  following: Follow[] | number;

  @ApiProperty({ example: 200 })
  follower: Follow[] | number;

  @ApiProperty({ example: 999 })
  point: Point[] | number;

  @ApiProperty({ example: [2] })
  followers?: number[];

  @ApiProperty({ example: [3] })
  blocker?: Block[];

  @ApiProperty({ example: [3] })
  blockers?: number[];
}
