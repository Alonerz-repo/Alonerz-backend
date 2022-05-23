import { ApiResponseProperty } from '@nestjs/swagger';
import { Group } from 'src/group/group.entity';
import { User } from 'src/user/user.entity';
import { GroupUserDto } from './group-user.dto';

export class SelectGroupDto {
  @ApiResponseProperty()
  groupId: string;

  @ApiResponseProperty()
  title: string;

  @ApiResponseProperty()
  categoryId: number;

  @ApiResponseProperty()
  placeName: string;

  @ApiResponseProperty()
  imageUrl: string;

  @ApiResponseProperty()
  startAt: Date;

  @ApiResponseProperty()
  endAt: Date;

  @ApiResponseProperty()
  limit: number;

  @ApiResponseProperty()
  address: string;

  @ApiResponseProperty()
  join: number;

  @ApiResponseProperty()
  host: GroupUserDto;

  constructor(group: Group) {
    const {
      groupId,
      title,
      categoryId,
      placeName,
      imageUrl,
      startAt,
      endAt,
      limit,
      address,
      guests,
      host,
    } = group;

    this.groupId = groupId;
    this.title = title;
    this.categoryId = categoryId;
    this.placeName = placeName;
    this.imageUrl = imageUrl;
    this.startAt = startAt;
    this.endAt = endAt;
    this.limit = limit;
    this.address = address;
    this.join = guests.length + 1;
    this.host = new GroupUserDto(host as unknown as User);
  }
}
