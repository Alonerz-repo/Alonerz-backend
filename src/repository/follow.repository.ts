import { FollowFilter } from 'src/common/interface';
import { Follow } from 'src/entity/follow.entity';
import { EntityRepository, QueryRunner, Repository } from 'typeorm';

@EntityRepository(Follow)
export class FollowRepository extends Repository<Follow> {
  // 사용자 팔로잉 목록 조회
  async findFollowUsers(userId: number, filter: FollowFilter) {
    const joinner = filter === 'following' ? 'otherId' : 'userId';
    const where = filter === 'following' ? 'userId' : 'otherId';
    return await this.createQueryBuilder('follows')
      .leftJoin(`follows.${joinner}`, 'users')
      .addSelect([
        'users.userId',
        'users.nickname',
        'users.profileImageUrl',
        'users.careerId',
        'users.year',
        'users.description',
      ])
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
  async followDone(userId: number, otherId: number): Promise<void> {
    await this.save({ userId, otherId });
  }

  // 다른 사용자 팔로잉 끊기
  async followCancel(followId: number): Promise<void> {
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
