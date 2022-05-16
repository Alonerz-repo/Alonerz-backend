import { FollowType } from 'src/common/interface';
import { EntityRepository, QueryRunner, Repository } from 'typeorm';
import { selectFollowUsers } from './select/selectFollowUsers';
import { Follow } from './follow.entity';

@EntityRepository(Follow)
export class FollowRepository extends Repository<Follow> {
  // 사용자 팔로잉 또는 팔로워 목록 조회
  async findFollowUsers(userId: number, followType: FollowType) {
    const joinner = followType === 'following' ? 'otherId' : 'userId';
    const where = followType === 'following' ? 'userId' : 'otherId';
    return await this.createQueryBuilder('follows')
      .leftJoin(`follows.${joinner}`, 'users')
      .addSelect(selectFollowUsers)
      .leftJoin('users.point', 'points')
      .addSelect(['points.point'])
      .where(`follows.${where} = :userId`, { userId })
      .getMany();
  }

  // 팔로우 상태 조회
  async findFollow(userId: number, otherId: number) {
    return await this.findOne({ userId, otherId });
  }

  // 다른 사용자 팔로잉
  async follow(userId: number, otherId: number): Promise<void> {
    await this.save({ userId, otherId });
  }

  // 다른 사용자 팔로잉 끊기
  async cancel(followId: number): Promise<void> {
    await this.delete({ id: followId });
  }

  // 차단 시 팔로잉, 팔로우 상태 해제 트랜젝션
  async followCancelTransaction(
    queryRunner: QueryRunner,
    userId: number,
    blockUserId: number,
  ) {
    await queryRunner.manager.delete(Follow, {
      userId,
      otherId: blockUserId,
    });
    await queryRunner.manager.delete(Follow, {
      userId: blockUserId,
      otherId: userId,
    });
  }
}
