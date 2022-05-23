import { ApiResponseProperty } from '@nestjs/swagger';

export class CommentUserDto {
  @ApiResponseProperty()
  userId: string;

  @ApiResponseProperty()
  nickname: string;

  @ApiResponseProperty()
  profileImageUrl: string;

  @ApiResponseProperty()
  characterImageId: string;

  @ApiResponseProperty()
  careerId: number;

  @ApiResponseProperty()
  yearId: number;
}
