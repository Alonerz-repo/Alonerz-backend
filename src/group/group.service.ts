import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupAction, GroupTime } from 'src/common/interface';
import { User } from 'src/user/user.entity';
import { CreateGroupDto } from './dto/request/create-group.dto';
import { UpdateGroupDto } from './dto/request/update-group.dto';
import { GroupException } from './group.exception';
import { GroupRepository } from './group.repository';
import { GroupUserRepository } from '../groupuser/groupuser.repository';
import { SelectGroupsDto } from './dto/response/select-groups.dto';
import { GroupDetailDto } from './dto/response/group-detail.dto';
import { CreatedGroupDto } from './dto/response/created-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private readonly groupRepository: GroupRepository,
    @InjectRepository(GroupUserRepository)
    private readonly groupUserRepository: GroupUserRepository,
    private readonly groupException: GroupException,
  ) {}

  // 그룹 방장 확인
  private async isHost(groupId: string): Promise<string> {
    const group = await this.groupRepository.findGroupHost(groupId);
    if (!group) {
      this.groupException.NotFound();
    }
    const host = group.host as unknown as User;
    if (!host) {
      this.groupException.NotFound();
    }
    return host.userId;
  }

  // 그룹 접근 권한 확인
  private async accessGroup(userId: string, groupId: string) {
    const group = await this.groupRepository.findOne({ groupId, host: userId });
    if (!group) {
      this.groupException.AccessDenined();
    }
    return group;
  }

  // 새 그룹 추가
  async createGroup(
    userId: string,
    image: Express.MulterS3.File,
    createGroupDto: CreateGroupDto,
  ): Promise<CreatedGroupDto> {
    // 현재 사용자가 참여 중인 그룹의 시간과 겹치는지 확인 후 생성
    const imageUrl = image?.location;
    const groupId = await this.groupRepository.createGroup(
      userId,
      imageUrl,
      createGroupDto,
    );
    return new CreatedGroupDto(groupId);
  }

  // 그룹 정보 수정
  async updateGroup(
    userId: string,
    groupId: string,
    image: Express.MulterS3.File,
    updateGroupDto: UpdateGroupDto,
  ): Promise<void> {
    await this.accessGroup(userId, groupId);
    const imageUrl = image?.location;
    await this.groupRepository.updateGroup(userId, imageUrl, updateGroupDto);
    return;
  }

  // 그룹 삭제
  async deleteGroup(userId: string, groupId: string): Promise<void> {
    await this.accessGroup(userId, groupId);
    await this.groupRepository.deleteGroup(groupId);
    return;
  }

  // 오늘 참여 그룹 목록 조회
  async getTodayGroups(userId: string): Promise<SelectGroupsDto> {
    const groups = await this.groupRepository.findTodayGroups(userId);
    return new SelectGroupsDto(groups);
  }

  // 특정 그룹 정보 조회
  async getGroupDetail(groupId: string): Promise<GroupDetailDto> {
    const group = await this.groupRepository.findGroupInfo(groupId);
    if (!group) {
      this.groupException.NotFound();
    }
    return new GroupDetailDto(group);
  }

  // 조건에 따른 그룹 목록 조회
  async getGroupsByQuery(
    x: number,
    y: number,
    offset?: number,
    time?: GroupTime,
  ): Promise<SelectGroupsDto> {
    const groups = await this.groupRepository.findGroupsByQuery(
      x,
      y,
      offset,
      time,
    );
    return new SelectGroupsDto(groups);
  }

  // 사용자의 모든 그룹 조회
  async getUserGroups(
    userId: string,
    offset?: number,
  ): Promise<SelectGroupsDto> {
    const groups = await this.groupRepository.findGroupsByUserId(
      userId,
      offset,
    );
    return new SelectGroupsDto(groups);
  }

  // 그룹 참여 및 탈퇴
  async joinOrExitGroup(
    userId: string,
    groupId: string,
    action: GroupAction,
  ): Promise<void> {
    if (!['join', 'exit'].includes(action)) {
      this.groupException.BadRequest();
    }

    const hostId = await this.isHost(groupId);
    if (hostId === userId) {
      this.groupException.YouAreHost();
    }

    action === 'join'
      ? await this.groupUserRepository.save({ groupId, guest: userId })
      : await this.groupUserRepository.softDelete({ groupId, guest: userId });
  }
}
