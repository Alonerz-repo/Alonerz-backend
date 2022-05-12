import { UserBlock } from 'src/entity/user-block.entity';
import { EntityRepository, QueryRunner, Repository } from 'typeorm';

@EntityRepository(UserBlock)
export class BlockRepository extends Repository<UserBlock> {
  // 사용자 차단 목록 조회
  async findBlockUsers(userId: number) {
    return await this.createQueryBuilder('blocks')
      .leftJoin('blocks.blockUserId', 'users')
      .select([
        'users.userId',
        'users.nickname',
        'users.profileImageUrl',
        'users.careerId',
        'users.year',
        'users.description',
      ])
      .leftJoin('uesrs.point', 'points')
      .addSelect(['points.point'])
      .where('follows.userId = :userId', { userId })
      .getMany();
  }

  // 차단 상태 조회
  async findBlock(userId: number, blockUserId: number) {
    return await this.findOne({ userId, blockUserId });
  }

  // 차단 상태 등록 트랜젝션
  async blockDoneTransaction(
    queryRunner: QueryRunner,
    userId: number,
    blockUserId: number,
  ) {
    await queryRunner.manager.save(UserBlock, { userId, blockUserId });
  }

  // 차단 상태 해제 트랜젝션
  async blockCancelTransaction(queryRunner: QueryRunner, blockId: number) {
    await queryRunner.manager.delete(UserBlock, {
      id: blockId,
    });
  }
}
