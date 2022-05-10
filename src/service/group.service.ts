import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroupDto } from 'src/dto/create-group.dto';
import { UpdateGroupDto } from 'src/dto/update-group.dto';
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

  async updateGroup(groupId: number, updateGroupData: UpdateGroupDto) {
    await this.groupRepository.save({ groupId, updateGroupData });
    return;
  }

  async deleteGroup(groupId: number) {
    const group = await this.groupRepository.findOne({ groupId });
    if (group) {
      await this.groupRepository.remove(group);
    }
    return;
  }
}
