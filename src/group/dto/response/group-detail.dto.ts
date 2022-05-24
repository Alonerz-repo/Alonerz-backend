import { ApiResponseProperty } from '@nestjs/swagger';
import { Group } from 'src/group/group.entity';
import { User } from 'src/user/user.entity';
import { GroupUserDto } from './group-user.dto';

export class GroupDetailDto {
  @ApiResponseProperty()
  groupId: string;

  @ApiResponseProperty()
  title: string;

  @ApiResponseProperty()
  categoryId: number;

  @ApiResponseProperty()
  description: string;

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
  locationX: number;

  @ApiResponseProperty()
  locationY: number;

  @ApiResponseProperty()
  address: string;

  @ApiResponseProperty()
  host: GroupUserDto;

  @ApiResponseProperty()
  guests: GroupUserDto[];

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;

  constructor(group: Group) {
    const {
      groupId,
      title,
      description,
      categoryId,
      placeName,
      imageUrl,
      startAt,
      endAt,
      limit,
      locationX,
      locationY,
      address,
      host,
      guests,
      createdAt,
      updatedAt,
    } = group;

    this.groupId = groupId;
    this.title = title;
    this.description = description;
    this.categoryId = categoryId;
    this.placeName = placeName;
    this.imageUrl = imageUrl;
    this.startAt = startAt;
    this.endAt = endAt;
    this.limit = limit;
    this.locationX = locationX as number;
    this.locationY = locationY as number;
    this.address = address;
    this.host = new GroupUserDto(host as unknown as User);
    this.guests = guests.map(
      (guest: any) => new GroupUserDto(guest.guest as User),
    );
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
