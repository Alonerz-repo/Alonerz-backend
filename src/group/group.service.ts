import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroupDto } from './dto/create.group.dto';
import { UpdateGroupDto } from './dto/update.group.dto';
import { Group } from './entities/group.entity';
import { GroupException } from './group.exception';
import { GroupRepository } from './repositories/group.repository';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private readonly groupRepository: GroupRepository,
    private readonly exception: GroupException,
  ) {}

  // 모든 그룹 정보 가져오기
  async getAllGroups(take?: number): Promise<Group[]> {
    return await this.groupRepository.getAllGroups(take);
  }

  // 특정 그룹 정보 가져오기
  async getGroup(groupId: number): Promise<Group> {
    const group = await this.groupRepository.getGroup(groupId);
    if (!group) this.exception.notFound();
    return group;
  }

  // 그룹 존재여부 확인
  private async exist(kakaoId: string, groupId: number): Promise<void> {
    const group = await this.getGroup(groupId);
    if (!group) this.exception.notFound();
    if (group.host !== kakaoId) this.exception.forbidden();
  }

  // 그룹 생성하기
  async createGroup(
    kakaoId: string,
    createGroupDto: CreateGroupDto,
  ): Promise<number> {
    return await this.groupRepository.createGroup(kakaoId, createGroupDto);
  }

  // 그룹 수정하기
  async updateGroup(
    kakaoId: string,
    groupId: number,
    updateGroupDto: UpdateGroupDto,
  ): Promise<void> {
    await this.exist(kakaoId, groupId);
    return await this.groupRepository.updateGroup(groupId, updateGroupDto);
  }

  // 그룹 삭제하기
  async deleteGroup(kakaoId: string, groupId: number): Promise<void> {
    await this.exist(kakaoId, groupId);
    return await this.groupRepository.deleteGroup(groupId);
  }
}
