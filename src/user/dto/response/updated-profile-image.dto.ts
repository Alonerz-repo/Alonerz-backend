import { ApiResponseProperty } from '@nestjs/swagger';

export class UpdatedProfileImageDto {
  @ApiResponseProperty()
  profileImageUrl: string;

  constructor(profileImageUrl: string) {
    this.profileImageUrl = profileImageUrl;
  }
}
