import { ApiResponseProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { SelectStickersDto } from './select-stickers.dto';
import { UserDto } from './user-dto';

export class SelectMainDto {
  @ApiResponseProperty()
  user: UserDto;

  constructor(userId: string, user: User) {
    user.followingUserIds.map((other: any) => other.otherId.userId);
    this.user = {
      userId: userId,
      nickname: user.nickname,
      careerId: user.careerId,
      yearId: user.yearId,
      description: user.description,
      ...new SelectStickersDto(user.stickers),
      characterImageId: user.characterImageId,
      backgroundColorId: user.backgroundColorId,
      followingUserCount: user.followingUserIds.length,
      followerUserCount: user.followerUserIds.length,
      isFollowing: user.followerUserIds
        .map((other: any) => other.userId.userId)
        .includes(userId)
        ? true
        : false,
      isFollower: user.followingUserIds
        .map((other: any) => other.otherId.userId)
        .includes(userId)
        ? true
        : false,
      point: user.point.reduce((pre: number, point: { point: number }) => {
        return pre + point.point;
      }, 0),
    };
  }
}
