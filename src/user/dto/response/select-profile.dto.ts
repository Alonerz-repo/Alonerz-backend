import { User } from 'src/user/user.entity';
import { ApiResponseProperty } from '@nestjs/swagger';

class ProfileDto {
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
  profileImageUrl: string;

  @ApiResponseProperty()
  point: number;
}

export class SelectProfileDto {
  @ApiResponseProperty()
  user: ProfileDto;

  constructor(user: User) {
    this.user = {
      userId: user.userId,
      nickname: user.nickname,
      careerId: user.careerId,
      yearId: user.yearId,
      description: user.description,
      profileImageUrl: user.profileImageUrl,
      point: user.point.reduce((pre: number, point: { point: number }) => {
        return pre + point.point;
      }, 0),
    };
  }
}
