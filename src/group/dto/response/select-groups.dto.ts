import { ApiResponseProperty } from '@nestjs/swagger';
import { Group } from 'src/group/group.entity';
import { SelectGroupDto } from './select-group.dto';

export class SelectGroupsDto {
  @ApiResponseProperty()
  groups: SelectGroupDto[];

  constructor(groups: Group[]) {
    this.groups = groups.map((group) => new SelectGroupDto(group));
  }
}
