import { ApiResponseProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { SelectStickerDto, SelectStickersDto } from './select-stickers.dto';

class UserDto {
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
  stickers: SelectStickerDto[];

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

export class SelectUserDto {
  @ApiResponseProperty()
  user: UserDto;

  constructor(userId: string, user: User) {
    this.user = {
      userId: user.userId,
      nickname: user.nickname,
      careerId: user.careerId,
      yearId: user.yearId,
      description: user.description,
      ...new SelectStickersDto(user.stickers),
      characterImageId: user.characterImageId,
      backgroundColorId: user.backgroundColorId,
      followingUserCount: user.followingUserIds.length,
      followerUserCount: user.followerUserIds.length,
      isFollowing: user.followerUserIds.find(
        (other: any) => other.userId.userId === userId,
      )
        ? true
        : false,
      isFollower: user.followingUserIds.find(
        (other: any) => other.userId.userId === userId,
      )
        ? true
        : false,
      point: user.point.reduce((pre: number, point: { point: number }) => {
        return pre + point.point;
      }, 0),
    };
  }
}
