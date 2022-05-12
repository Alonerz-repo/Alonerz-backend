import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Follow } from 'src/entity/follow.entity';
import { Point } from 'src/entity/point.entity';
import { UserDtoSwagger } from 'src/swagger/user.swagger';

export class UpdateUserDto {
  @ApiProperty(UserDtoSwagger.nickname)
  @IsOptional()
  @IsString()
  @Length(2, 20)
  nickname?: string;

  @ApiProperty(UserDtoSwagger.profileImageUrl)
  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @ApiProperty(UserDtoSwagger.careerId)
  @IsOptional()
  @IsNumber()
  careerId?: number;

  @ApiProperty(UserDtoSwagger.year)
  @IsOptional()
  @IsString()
  year?: string;

  @ApiProperty(UserDtoSwagger.description)
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
