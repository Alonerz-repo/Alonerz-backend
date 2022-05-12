import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupAction, GroupTime } from 'src/common/interface';
import { CreateGroupDto, UpdateGroupDto } from 'src/dto/group.dto';
import { GroupUser } from 'src/entity/group-user.entity';
import { ForbiddenGroup, NotFoundGroup } from 'src/exception/group.exception';
import { GroupRepository } from 'src/repository/group.repository';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private readonly groupRepository: GroupRepository,
    @InjectRepository(GroupUser)
    private readonly groupUserRepository: Repository<GroupUser>,
  ) {}

  // 그룹 존재 여부 확인
  private async findGroup(groupId: number) {
    const group = await this.groupRepository.findOne(groupId);
    return group ? group : NotFoundGroup();
  }

  // 그룹 접근 권한 확인
  private async accessGroup(userId: number, groupId: number) {
    const group = await this.findGroup(groupId);
    return group.host === userId ? group : ForbiddenGroup();
  }

  // 새 그룹 추가
  async createGroup(userId: number, createGroupDto: CreateGroupDto) {
    // 현재 사용자가 참여 중인 그룹의 시간과 겹치는지 확인 후 생성
    return await this.groupRepository.createGroup(userId, createGroupDto);
  }

  // 그룹 정보 수정
  async updateGroup(
    userId: number,
    groupId: number,
    updateGroupDto: UpdateGroupDto,
  ) {
    await this.accessGroup(userId, groupId);
    await this.groupRepository.updateGroup(groupId, updateGroupDto);
  }

  // 그룹 삭제
  async deleteGroup(userId: number, groupId: number) {
    await this.accessGroup(userId, groupId);
    await this.groupRepository.deleteGroup(groupId);
  }

  // 오늘 참여 그룹 목록 조회
  async getTodayGroups(userId: number) {
    const groups = await this.groupRepository.findTodayGroups(userId);
    return { groups };
  }

  // 특정 그룹 정보 조회
  async getGroupInfo(groupId: number) {
    const group = await this.groupRepository.findGroupInfo(groupId);
    !group && NotFoundGroup();
    group.guests = group.guests.map((guest: any) => guest.guest);
    return { group };
  }

  // 조건에 따른 그룹 목록 조회
  async getGroupsByQuery(
    x: number,
    y: number,
    offset?: number,
    when?: GroupTime,
  ) {
    const groups = await this.groupRepository.findGroupsByQuery(
      x,
      y,
      offset,
      when,
    );
    return { groups };
  }

  // 사용자의 모든 그룹 조회
  async getUserGroups(userId: number, offset?: number) {
    const groups = await this.groupRepository.findGroupsByUserId(
      userId,
      offset,
    );
    return { groups };
  }

  // 그룹 참여 및 탈퇴
  async joinOrExitGroup(userId: number, groupId: number, action: GroupAction) {
    await this.findGroup(groupId);
    action === 'join'
      ? await this.groupUserRepository.save({ groupId, guest: userId })
      : await this.groupUserRepository.softDelete({ groupId, guest: userId });
  }
}
