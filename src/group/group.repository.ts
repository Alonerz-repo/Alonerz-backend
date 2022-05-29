import { EntityRepository, Repository } from 'typeorm';
import { CreateGroupDto } from './dto/request/create-group.dto';
import { UpdateGroupDto } from './dto/request/update-group.dto';
import { selectGroup } from './select/selectGroup';
import { selectGroupGuest } from './select/selectGroupGuest';
import { selectGroupHost } from './select/selectGroupHost';
import { selectGroups } from './select/selectGroups';
import { GroupTime } from 'src/common/interface';
import { Group } from './group.entity';

const times = {
  lunch: {
    startTime: '09:00:00',
    endTime: '17:00:00',
  },
  dinner: {
    startTime: '17:00',
    endTime: '23:00:00',
  },
  all: {
    startTime: '09:00',
    endTime: '23:00:00',
  },
};

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
  // 그룹 방장 조회
  async findGroupHost(groupId: string) {
    return await this.createQueryBuilder('group')
      .select()
      .leftJoin('group.host', 'host')
      .addSelect(['host.userId'])
      .leftJoinAndSelect('group.guests', 'guests')
      .where('group.groupId = :groupId', { groupId })
      .getOne();
  }

  // 그룹 생성 트랜젝션
  async createGroup(
    userId: string,
    imageUrl: string | null,
    createGroupDto: CreateGroupDto,
  ): Promise<string> {
    const { groupId } = await this.save({
      host: userId,
      imageUrl,
      ...createGroupDto,
    });
    return groupId;
  }

  // 그룹 수정 트랜젝션
  async updateGroup(
    groupId: string,
    imageUrl: string | null,
    updateGroupDto: UpdateGroupDto,
  ): Promise<void> {
    imageUrl
      ? await this.update({ groupId }, { ...updateGroupDto, imageUrl })
      : await this.update({ groupId }, updateGroupDto);
  }

  // 그룹 삭제
  async deleteGroup(groupId: string): Promise<void> {
    await this.softDelete(groupId);
    return;
  }

  // 그룹 상세 정보 조회
  async findGroupInfo(groupId: string): Promise<Group> {
    return await this.createQueryBuilder('group')
      .select(selectGroup)
      .leftJoin('group.host', 'host')
      .addSelect(selectGroupHost)
      .leftJoin('group.guests', 'guests')
      .addSelect(['guests.id'])
      .leftJoin('guests.guest', 'guest')
      .addSelect(selectGroupGuest)
      .where('group.groupId = :groupId', { groupId })
      .getOne();
  }

  // 오늘 참여 그룹 목록 조회
  async findTodayGroups(userId: string): Promise<Group[]> {
    return await this.createQueryBuilder('groups')
      .select(selectGroups)
      .leftJoin('groups.host', 'host')
      .addSelect(selectGroupHost)
      .leftJoinAndSelect('groups.guests', 'guests')
      .leftJoin('guests.guest', 'guest')
      .addSelect('guest.userId')
      .where('groups.host.userId = :userId', { userId })
      .orWhere('guest.userId = :userId', { userId })
      .andWhere('groups.startAt >= :today', { today: new Date() })
      .orderBy('groups.startAt', 'DESC')
      .getMany();
  }

  // 조건에 따른 그룹 목록 조회
  // 시간대 추가할 것
  async findGroupsByQuery(
    x: number,
    y: number,
    offset?: number,
    time?: GroupTime,
  ): Promise<Group[]> {
    // 500미터
    // 1000미터
    // 3000미터
    // 5000미터

    const { startTime, endTime } = times[time ? time : 'all'];
    const groups = await this.createQueryBuilder('groups')
      .select([...selectGroups])
      .leftJoin('groups.host', 'host')
      .addSelect(selectGroupHost)
      .leftJoin('groups.guests', 'guests')
      .addSelect(['guests.id'])
      .where(
        `DATE_FORMAT(groups.startAt, '%T') between :startTime and :endTime`,
        {
          startTime,
          endTime,
        },
      )
      .orderBy('groups.startAt', 'DESC')
      // .limit(offset ? 8 : 4)
      .offset(offset ? offset : 0)
      .getMany();
    return groups;
  }

  // 사용자가 참여한 모든 그룹 조회
  async findGroupsByUserId(userId: string, offset?: number): Promise<Group[]> {
    return await this.createQueryBuilder('groups')
      .select(selectGroups)
      .leftJoin('groups.host', 'host')
      .addSelect(selectGroupHost)
      .leftJoinAndSelect('groups.guests', 'guests')
      .leftJoin('guests.guest', 'guest')
      .addSelect('guest.userId')
      .where('groups.host.userId = :userId', { userId })
      .orWhere('guest.userId = :userId', { userId })
      .orderBy('groups.startAt', 'DESC')
      // .limit(offset ? 8 : 4)
      .offset(offset ? offset : 0)
      .getMany();
  }
}
