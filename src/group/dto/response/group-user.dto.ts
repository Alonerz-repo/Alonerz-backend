import { ApiResponseProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class GroupUserDto {
  @ApiResponseProperty()
  userId: string;

  @ApiResponseProperty()
  nickname: string;

  @ApiResponseProperty()
  profileImageUrl: string | null;

  @ApiResponseProperty()
  characterImageId: number;

  @ApiResponseProperty()
  careerId: number;

  @ApiResponseProperty()
  yearId: number;

  @ApiResponseProperty()
  description: string;

  constructor(user: User) {
    const {
      userId,
      nickname,
      profileImageUrl,
      characterImageId,
      careerId,
      yearId,
      description,
    } = user;

    this.userId = userId;
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
    this.characterImageId = characterImageId;
    this.careerId = careerId;
    this.yearId = yearId;
    this.description = description;
  }
}
