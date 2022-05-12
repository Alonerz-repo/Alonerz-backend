import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Follow } from 'src/entity/follow.entity';
import { Point } from 'src/entity/point.entity';
import { UserProperty } from 'src/swagger/property/user.property';

export class UpdateUserDto {
  @ApiProperty(UserProperty.nickname)
  @IsOptional()
  @IsString()
  @Length(2, 20)
  nickname?: string;

  @ApiProperty(UserProperty.profileImageUrl)
  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @ApiProperty(UserProperty.careerId)
  @IsOptional()
  @IsNumber()
  careerId?: number;

  @ApiProperty(UserProperty.year)
  @IsOptional()
  @IsString()
  year?: string;

  @ApiProperty(UserProperty.description)
  @IsOptional()
  @IsString()
  description?: string;
}

export interface UserInfoData {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  year: string;
  description: string;
  careerId: number;
  following: Follow[] | number;
  follower: Follow[] | number;
  point: Point[] | number;
}

export interface UserFollowRow {
  id: number;
  userId?: number | UserInfoData;
  otherId?: number | UserInfoData;
}

export interface UserBlockRow {
  id: number;
  userId?: number | UserInfoData;
  otherId?: number | UserInfoData;
}
