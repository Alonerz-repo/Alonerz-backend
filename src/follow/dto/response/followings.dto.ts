import { ApiResponseProperty } from '@nestjs/swagger';
import { Follow } from 'src/follow/follow.entity';
import { User } from 'src/user/user.entity';
import { FollowUserDto } from './follow-user.dto';

export class FollowersDto {
  @ApiResponseProperty()
  users: FollowUserDto[];

  constructor(users: Follow[]) {
    this.users = users.map(
      (user) => new FollowUserDto(user.userId as unknown as User),
    );
  }
}
