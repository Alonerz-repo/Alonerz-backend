import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupAction, GroupTime } from 'src/common/interface';
import { ImageRepository } from 'src/image/image.repository';
import { Connection } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupException } from './group.exception';
import { GroupRepository } from './group.repository';
import { GroupUserRepository } from './groupuser.repository';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private readonly groupRepository: GroupRepository,
    @InjectRepository(GroupUserRepository)
    private readonly groupUserRepository: GroupUserRepository,
    @InjectRepository(ImageRepository)
    private readonly imageRepository: ImageRepository,
    private connection: Connection,
    private readonly groupException: GroupException,
  ) {}

  // 그룹 방장 확인
  private async isHost(groupId: string) {
    const group = await this.groupRepository.findGroupHost(groupId);
    const host = group.host as any;
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
  ) {
    // 현재 사용자가 참여 중인 그룹의 시간과 겹치는지 확인 후 생성
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let error = null;
    let groupId: string;
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await this.imageRepository.uploadImageTransaction(
          queryRunner,
          image,
        );
      }
      groupId = await this.groupRepository.createGroupTransaction(
        queryRunner,
        userId,
        imageUrl,
        createGroupDto,
      );
      await queryRunner.commitTransaction();
    } catch (e) {
      error = e;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (error) {
      this.groupException.Transaction();
    }

    return groupId;
  }

  // 그룹 정보 수정
  async updateGroup(
    userId: string,
    groupId: string,
    image: Express.MulterS3.File,
    updateGroupDto: UpdateGroupDto,
  ) {
    await this.accessGroup(userId, groupId);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let error = null;
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await this.imageRepository.uploadImageTransaction(
          queryRunner,
          image,
        );
      }
      await this.groupRepository.updateGroupTransaction(
        queryRunner,
        groupId,
        imageUrl,
        updateGroupDto,
      );
      await queryRunner.commitTransaction();
    } catch (e) {
      error = e;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (error) {
      this.groupException.Transaction();
    }
  }

  // 그룹 삭제
  async deleteGroup(userId: string, groupId: string) {
    await this.accessGroup(userId, groupId);
    await this.groupRepository.deleteGroup(groupId);
  }

  // 오늘 참여 그룹 목록 조회
  async getTodayGroups(userId: string) {
    const groups = await this.groupRepository.findTodayGroups(userId);
    return { groups };
  }

  // 특정 그룹 정보 조회
  async getGroupDetail(groupId: string) {
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
    const rows = await this.groupRepository.findGroupsByQuery(
      x,
      y,
      offset,
      time,
    );

    const groups = rows.map((group) => {
      const row = {
        ...group,
        join: group.guests.length + 1,
      };
      delete row.guests;
      return row;
    });

    return { groups };
  }

  // 사용자의 모든 그룹 조회
  async getUserGroups(userId: string, offset?: number) {
    const groups = await this.groupRepository.findGroupsByUserId(
      userId,
      offset,
    );
    return { groups };
  }

  // 그룹 참여 및 탈퇴
  async joinOrExitGroup(userId: string, groupId: string, action: GroupAction) {
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
