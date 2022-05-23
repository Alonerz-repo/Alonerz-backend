import { ApiResponseProperty } from '@nestjs/swagger';

export class CreatedGroupDto {
  @ApiResponseProperty()
  groupId: string;

  constructor(groupId: string) {
    this.groupId = groupId;
  }
}
