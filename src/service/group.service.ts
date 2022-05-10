import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroupDto } from 'src/dto/group.dto';
import { Group } from 'src/entity/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async createGroup(userId: number, createGroupDto: CreateGroupDto) {
    const { groupId } = await this.groupRepository.save({
      hostUserId: userId,
      ...createGroupDto,
    });
    return { groupId };
  }

  async updateGroup(groupId: number, groupData: any) {
    await this.groupRepository.save(groupData);
    return;
  }
}
