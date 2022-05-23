import { ApiResponseProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class FollowUserDto {
  @ApiResponseProperty()
  userId: string;

  @ApiResponseProperty()
  nickname: string;

  @ApiResponseProperty()
  profileImageUrl: string;

  @ApiResponseProperty()
  characterImageId: number;

  @ApiResponseProperty()
  careerId: number;

  @ApiResponseProperty()
  yearId: number;

  @ApiResponseProperty()
  description: string;

  @ApiResponseProperty()
  point: number;

  constructor(user: User) {
    const {
      userId,
      nickname,
      profileImageUrl,
      characterImageId,
      careerId,
      yearId,
      description,
      point,
    } = user;

    this.userId = userId;
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
    this.characterImageId = characterImageId;
    this.careerId = careerId;
    this.yearId = yearId;
    this.description = description;
    this.point = point.reduce(
      (pre: number, current: { point: number }) => pre + current.point,
      0,
    );
  }
}
