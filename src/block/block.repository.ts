import { Block } from './block.entity';
import { EntityRepository, QueryRunner, Repository } from 'typeorm';
import { selectBlockUsers } from './select/selectBlockUsers';

@EntityRepository(Block)
export class BlockRepository extends Repository<Block> {
  // 사용자가 차단한 userId 조회
  async findBlockUserId(userId: string) {
    return await this.createQueryBuilder('blocks')
      .leftJoin('blocks.otherId', 'users')
      .addSelect('users.userId')
      .where('blocks.userId = :userId', { userId })
      .getMany();
  }

  // 사용자 차단 목록 조회
  async findBlockUsers(userId: string) {
    return await this.createQueryBuilder('blocks')
      .leftJoin('blocks.otherId', 'users')
      .addSelect(selectBlockUsers)
      .leftJoin('users.point', 'points')
      .addSelect(['points.point'])
      .where('blocks.userId = :userId', { userId })
      .getMany();
  }

  // 차단 상태 조회
  async findBlock(userId: string, otherId: string) {
    return await this.findOne({ userId, otherId });
  }

  // 차단 상태 등록 트랜젝션
  async blockDoneTransaction(
    queryRunner: QueryRunner,
    userId: string,
    otherId: string,
  ) {
    await queryRunner.manager.save(Block, { userId, otherId });
  }

  // 차단 상태 해제 트랜젝션
  async blockCancelTransaction(queryRunner: QueryRunner, blockId: number) {
    await queryRunner.manager.delete(Block, {
      id: blockId,
    });
  }
}
