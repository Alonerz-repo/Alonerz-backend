import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupAction, GroupTime } from 'src/common/interface';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupUser } from './group-user.entity';
import { GroupException } from './group.exception';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private readonly groupRepository: GroupRepository,
    @InjectRepository(GroupUser)
    private readonly groupUserRepository: Repository<GroupUser>,
    private readonly groupException: GroupException,
  ) {}

  // 그룹 접근 권한 확인
  private async accessGroup(userId: number, groupId: number) {
    const group = await this.groupRepository.findOne({ groupId, host: userId });
    if (!group) {
      this.groupException.AccessDenined();
    }
    return group;
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
  async getGroupDetail(groupId: number) {
    const group = await this.groupRepository.findGroupInfo(groupId);
    if (!group) {
      this.groupException.NotFound();
    }
    group.guests = group.guests.map((guest: any) => guest.guest);
    return { group };
  }

  // 조건에 따른 그룹 목록 조회
  async getGroupsByQuery(
    x: number,
    y: number,
    offset?: number,
    time?: GroupTime,
  ) {
    const groups = await this.groupRepository.findGroupsByQuery(
      x,
      y,
      offset,
      time,
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
    if (!['join', 'exit'].includes(action)) {
      this.groupException.BadRequest();
    }

    const isHost = await this.accessGroup(userId, groupId);
    if (isHost) {
      this.groupException.YouAreHost();
    }

    action === 'join'
      ? await this.groupUserRepository.save({ groupId, guest: userId })
      : await this.groupUserRepository.softDelete({ groupId, guest: userId });
  }
}
