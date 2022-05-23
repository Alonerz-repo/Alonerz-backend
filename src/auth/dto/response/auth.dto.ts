import { ApiResponseProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class AuthDto {
  @ApiResponseProperty()
  userId: string;

  @ApiResponseProperty()
  nickname: string;

  @ApiResponseProperty()
  needProfile: boolean;

  constructor(user: User) {
    const { userId, nickname } = user;
    this.userId = userId;
    this.nickname = nickname;
    this.needProfile = !isNaN(Number(nickname));
  }
}
