import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowRepository } from 'src/follow/follow.repository';
import { UserInfoRow } from 'src/user/row/user-info.row';
import { UserRepository } from 'src/user/user.repository';
import { Connection } from 'typeorm';
import { BlockException } from './block.exception';
import { BlockRepository } from './block.repository';
import { UserBlockRow } from './row/user-block.row';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(BlockRepository)
    private readonly blockRepository: BlockRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(FollowRepository)
    private readonly followRepository: FollowRepository,
    private readonly blockException: BlockException,
    private readonly connection: Connection,
  ) {}

  // 계정 조회
  private async findUser(userId: string) {
    const user = await this.userRepository.findOne({ userId });
    if (!user) {
      this.blockException.NotFound();
    }
    return user;
  }

  // 자신의 차단 목록 조회
  async findBlocks(userId: string) {
    const rows: UserBlockRow[] = await this.blockRepository.findBlockUsers(
      userId,
    );
    const users = rows.map((row) => {
      const user = row.otherId as UserInfoRow;
      user.point = user.point as [];
      user.point = user.point.reduce(
        (pre: number, current: { point: number }) => pre + current.point,
        0,
      );
      return user;
    });
    return { users };
  }

  // 다른 사용자 차단 또는 철회
  async blockOrCancel(userId: string, otherId: string): Promise<void> {
    if (userId === otherId) {
      this.blockException.AreYouTired();
    }

    const user = await this.findUser(userId);
    const other = await this.findUser(otherId);
    const block = await this.blockRepository.findBlock(userId, otherId);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let error = null;
    try {
      if (block) {
        // 차단 상태 해제
        await this.blockRepository.blockCancelTransaction(
          queryRunner,
          block.id,
        );
      } else {
        // 차단 목록에 추가
        await this.blockRepository.blockDoneTransaction(
          queryRunner,
          user.userId,
          other.userId,
        );
        // 팔로잉 & 팔로워 상태 끊기
        await this.followRepository.followCancelTransaction(
          queryRunner,
          user.userId,
          other.userId,
        );
      }
      await queryRunner.commitTransaction();
    } catch (e) {
      error = e;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (error) {
      this.blockException.Transaction();
    }
  }
}
