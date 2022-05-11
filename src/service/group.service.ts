import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroupDto, UpdateGroupDto } from 'src/dto/group.dto';
import { Group } from 'src/entity/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  private async findGroup(groupId: number) {
    const group = await this.groupRepository.findOne({ groupId });
    if (!group) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['그룹 정보를 찾을 수 없습니다.'],
        error: 'Not Found',
      });
    }
    return group;
  }

  // (확정) 새 그룹 추가
  async createGroup(userId: number, createGroupDto: CreateGroupDto) {
    const { groupId } = await this.groupRepository.save({
      host: userId,
      ...createGroupDto,
    });
    return { groupId };
  }

  // (확정) 그룹 정보 수정
  async updateGroup(groupId: number, updateGroupDto: UpdateGroupDto) {
    await this.findGroup(groupId);
    await this.groupRepository.update(groupId, updateGroupDto);
  }

  // (확정) 그룹 삭제
  async deleteGroup(groupId: number) {
    await this.findGroup(groupId);
    await this.groupRepository.softDelete(groupId);
  }

  // 그룹 참여
  async joinGroup(userId: number, groupId: number) {
    return;
  }

  // 그룹 탈퇴
  async exitGroup(userId: number, groupId: number) {
    return;
  }

  // (확정 필요) 현재 사용자의 오늘 참여할 그룹 조회
  async getTodayGroups(userId: number) {
    const groups = await this.groupRepository
      .createQueryBuilder('groups')
      .select([
        'groups.groupId',
        'groups.title',
        'groups.menu',
        'groups.placeName',
        'groups.limit',
        'groups.imageUrl',
      ])
      .leftJoin('groups.host', 'host')
      .leftJoinAndSelect('host.career', 'hostCareer')
      .addSelect([
        'host.userId',
        'host.nickname',
        'host.year',
        'host.description',
        'host.profileImageUrl',
        'host.career',
      ])
      .leftJoin('groups.guests', 'guests')
      .addSelect(['guests.id'])
      .where('groups.host.userId = :userId', { userId })
      .orWhere(':userId IN (SELECT guest from group_users)', { userId })
      .andWhere('groups.startAt > :today', { today: new Date() })
      .orderBy('groups.startAt', 'DESC')
      .getMany();

    return {
      groups: groups.map((group) => {
        const row = {
          ...group,
          join: group.guests.length + 1,
        };
        delete row.guests;
        return row;
      }),
    };
  }

  // (확정) 특정 그룹 정보 조회
  async getGroupInfo(groupId: number) {
    const group = await this.groupRepository
      .createQueryBuilder('group')
      .select([
        'group.groupId',
        'group.title',
        'group.description',
        'group.menu',
        'group.placeName',
        'group.imageUrl',
        'group.startAt',
        'group.endAt',
        'group.limit',
        'group.locationX',
        'group.locationY',
        'group.address1',
        'group.address2',
        'group.createdAt',
        'group.updatedAt',
      ])
      .leftJoin('group.host', 'host')
      .leftJoinAndSelect('host.career', 'hostCareer')
      .addSelect([
        'host.userId',
        'host.nickname',
        'host.year',
        'host.description',
        'host.profileImageUrl',
        'host.career',
      ])
      .leftJoinAndSelect('group.guests', 'guests')
      .leftJoin('guests.guest', 'guest')
      .addSelect([
        'guest.userId',
        'guest.nickname',
        'guest.year',
        'guest.description',
        'guest.profileImageUrl',
        'guest.career',
      ])
      .leftJoinAndSelect('guest.career', 'guestCareer')
      .where('group.groupId = :groupId', { groupId })
      .getOne();

    if (!group) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['그룹 정보를 찾을 수 없습니다.'],
        error: 'Not Found',
      });
    }

    group.guests = group.guests.map((guest: any) => guest.guest);
    return { group };
  }

  // 아침 & 점심 그룹 조회
  async getLunchGroups(x?: number, y?: number) {
    // x, y 조건 걸어놓을 것
    // 이거 어차피 Repository로 역할 분리시킬 것이므로
    // 지금은 코드 중복되어도 상관 없음

    const groups = await this.groupRepository
      .createQueryBuilder('groups')
      .select([
        'groups.groupId',
        'groups.title',
        'groups.menu',
        'groups.placeName',
        'groups.limit',
        'groups.imageUrl',
      ])
      .leftJoin('groups.host', 'host')
      .leftJoinAndSelect('host.career', 'hostCareer')
      .addSelect([
        'host.userId',
        'host.nickname',
        'host.year',
        'host.description',
        'host.profileImageUrl',
        'host.career',
      ])
      .leftJoin('groups.guests', 'guests')
      .addSelect(['guests.id'])
      .where('groups.locationX BETWEEN :x1 AND :x2', {
        x1: x - 200,
        x2: x + 200,
      })
      .orWhere('groups.locationY BETWEEN :y1 AND :y2', {
        y1: y - 200,
        y2: y + 200,
      })
      // 아침 & 점심 시간 조건 추가할 것
      .andWhere('groups.startAt > :today', { today: new Date() })
      .orderBy('groups.startAt', 'DESC')
      .getMany();

    return {
      groups: groups.map((group) => {
        const row = {
          ...group,
          join: group.guests.length + 1,
        };
        delete row.guests;
        return row;
      }),
    };
  }

  // 저녁 & 야식 그룹 조회
  async getDinnerGroups(x?: number, y?: number) {
    const groups = await this.groupRepository
      .createQueryBuilder('groups')
      .select([
        'groups.groupId',
        'groups.title',
        'groups.menu',
        'groups.placeName',
        'groups.limit',
        'groups.imageUrl',
      ])
      .leftJoin('groups.host', 'host')
      .leftJoinAndSelect('host.career', 'hostCareer')
      .addSelect([
        'host.userId',
        'host.nickname',
        'host.year',
        'host.description',
        'host.profileImageUrl',
        'host.career',
      ])
      .leftJoin('groups.guests', 'guests')
      .addSelect(['guests.id'])
      .where('groups.locationX BETWEEN :x1 AND :x2', {
        x1: x - 200,
        x2: x + 200,
      })
      .orWhere('groups.locationY BETWEEN :y1 AND :y2', {
        y1: y - 200,
        y2: y + 200,
      })
      // 저녁 & 야식 시간 조건 추가할 것
      .andWhere('groups.startAt > :today', { today: new Date() })
      .orderBy('groups.startAt', 'DESC')
      .getMany();

    return {
      groups: groups.map((group) => {
        const row = {
          ...group,
          join: group.guests.length + 1,
        };
        delete row.guests;
        return row;
      }),
    };
  }
}
