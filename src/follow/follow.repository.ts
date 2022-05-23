import { EntityRepository, QueryRunner, Repository } from 'typeorm';
import { selectFollowUsers } from './select/selectFollowUsers';
import { Follow } from './follow.entity';

@EntityRepository(Follow)
export class FollowRepository extends Repository<Follow> {
  // 팔로잉 목록 조회
  async findFollowings(userId: string) {
    return await this.createQueryBuilder('follows')
      .leftJoin('follows.otherId', 'users')
      .addSelect(selectFollowUsers)
      .leftJoin('users.point', 'points')
      .addSelect(['points.point'])
      .where('follows.userId = :userId', { userId })
      .getMany();
  }

  // 팔로워 목록 조회
  async findFollowers(userId: string): Promise<Follow[]> {
    return await this.createQueryBuilder('follows')
      .leftJoin('follows.userId', 'users')
      .addSelect(selectFollowUsers)
      .leftJoin('users.point', 'points')
      .addSelect(['points.point'])
      .where('follows.otherId = :userId', { userId })
      .getMany();
  }

  // 팔로우 상태 조회
  async findFollow(userId: string, otherId: string) {
    return await this.findOne({ userId, otherId });
  }

  // 다른 사용자 팔로잉
  async follow(userId: string, otherId: string): Promise<void> {
    await this.save({ userId, otherId });
  }

  // 다른 사용자 팔로잉 끊기
  async cancel(followId: number): Promise<void> {
    await this.delete({ id: followId });
  }

  // 차단 시 팔로잉, 팔로우 상태 해제 트랜젝션
  async followCancelTransaction(
    queryRunner: QueryRunner,
    userId: string,
    blockUserId: string,
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
