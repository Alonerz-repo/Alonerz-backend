import { ApiResponseProperty } from '@nestjs/swagger';
import { StickerDto } from './sticker.dto';

export class UserDto {
  @ApiResponseProperty()
  userId: string;

  @ApiResponseProperty()
  nickname: string;

  @ApiResponseProperty()
  careerId: number;

  @ApiResponseProperty()
  yearId: number;

  @ApiResponseProperty()
  description: string;

  @ApiResponseProperty()
  stickers: StickerDto[];

  @ApiResponseProperty()
  characterImageId: number;

  @ApiResponseProperty()
  backgroundColorId: number;

  @ApiResponseProperty()
  followingUserCount: number;

  @ApiResponseProperty()
  followerUserCount: number;

  @ApiResponseProperty()
  isFollowing: boolean;

  @ApiResponseProperty()
  isFollower: boolean;

  @ApiResponseProperty()
  point: number;
}
