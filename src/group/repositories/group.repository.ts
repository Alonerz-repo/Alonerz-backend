import { EntityRepository, Repository } from 'typeorm';
import { CreateGroupDto } from '../dto/create.group.dto';
import { UpdateGroupDto } from '../dto/update.group.dto';
import { Group } from '../entities/group.entity';

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
  // 모든 그룹 정보 가져오기
  async getAllGroups(take?: number): Promise<Group[]> {
    return await this.find({
      order: { createdAt: 'DESC' },
      take: take ? take : 4,
    });
  }

  // 특정 그룹 정보 가져오기
  async getGroup(groupId: number): Promise<Group> {
    const group = await this.findOne(groupId);
    return group;
  }

  // 그룹 생성하기
  async createGroup(
    kakaoId: string,
    createGroupDto: CreateGroupDto,
  ): Promise<number> {
    const newGroup = { ...createGroupDto, kakaoId };
    const { groupId } = await this.save(newGroup, { reload: true });
    return groupId;
  }

  // 그룹 수정하기
  async updateGroup(
    groupId: number,
    updateGroupDto: UpdateGroupDto,
  ): Promise<void> {
    await this.update(groupId, updateGroupDto);
  }

  // 그룹 삭제하기
  async deleteGroup(groupId: number): Promise<void> {
    await this.update(groupId, { deletedAt: new Date() });
  }
}
