import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { UserFollow } from 'src/entity/user-follow.entity';
import { UserPoint } from 'src/entity/user-point.entity';
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
  following: UserFollow[] | number;
  follower: UserFollow[] | number;
  point: UserPoint[] | number;
}

export interface UserFollowRow {
  id: number;
  userId?: number | UserInfoData;
  followUserId?: number | UserInfoData;
}

export interface UserBlockRow {
  id: number;
  userId?: number | UserInfoData;
  blockUserId?: number | UserInfoData;
}
