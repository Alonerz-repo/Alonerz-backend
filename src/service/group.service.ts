import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupDto } from 'src/dto/group.dto';
import { Group } from 'src/entity/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async createGroup(groupData: GroupDto) {
    await this.groupRepository.save(groupData);
    return;
  }

  async updateGroup(groupId: number, groupData: GroupDto) {
    await this.groupRepository.save(groupData);
    return;
  }
}
