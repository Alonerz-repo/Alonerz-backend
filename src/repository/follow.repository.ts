import { FollowFilter } from 'src/common/interface';
import { UserFollow } from 'src/entity/user-follow.entity';
import { EntityRepository, QueryRunner, Repository } from 'typeorm';

@EntityRepository(UserFollow)
export class FollowRepository extends Repository<UserFollow> {
  // 사용자 팔로잉 목록 조회
  async findFollowUsers(userId: number, filter: FollowFilter) {
    const joinner = filter === 'following' ? 'followUserId' : 'userId';
    const where = filter === 'following' ? 'userId' : 'followUserId';
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
  async findFollow(userId: number, followUserId: number) {
    return await this.findOne({ userId, followUserId });
  }

  // 다른 사용자 팔로잉
  async followDone(userId: number, followUserId: number): Promise<void> {
    await this.save({ userId, followUserId });
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
    await queryRunner.manager.delete(UserFollow, {
      userId,
      followUserId: blockUserId,
    });
    await queryRunner.manager.delete(UserFollow, {
      userId: blockUserId,
      followUserId: userId,
    });
  }
}
