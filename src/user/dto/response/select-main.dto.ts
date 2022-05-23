import { ApiResponseProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { SelectStickersDto } from './select-stickers.dto';
import { UserDto } from './user-dto';

export class SelectMainDto {
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
