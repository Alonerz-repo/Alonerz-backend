import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowFilter } from 'src/common/interface';
import {
  UpdateUserDto,
  UserBlockRow,
  UserFollowRow,
  UserInfoData,
} from 'src/dto/user.dto';
import {
  AlreadyUsedFor,
  InternalDBError,
  NotFoundUser,
  SpecialFail,
} from 'src/exception/user.exception';
import { BlockRepository } from 'src/repository/block.repository';
import { FollowRepository } from 'src/repository/follow.repository';
import { UserRepository } from 'src/repository/user.repository';
import { User } from 'src/entity/user.entity';
import { Connection } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(FollowRepository)
    private followRepository: FollowRepository,
    @InjectRepository(BlockRepository)
    private blockRepository: BlockRepository,
    private connection: Connection,
  ) {}

  // 사용자 존재 여부 확인
  private async findUserByUserId(userId: number): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    return user ? user : NotFoundUser();
  }

  // 사용자 정보 조회
  private async findUserInfo(userId: number): Promise<User> {
    const user = await this.userRepository.findUserInfo(userId);
    return user ? user : NotFoundUser();
  }

  // 닉네임 중복성 검사
  private async findUserByNickname(userId: number, nickname: string) {
    const user = await this.userRepository.findOne(nickname);
    return user && user.userId === userId ? user : AlreadyUsedFor('닉네임');
  }

  // 사용자 프로필 조회
  async getUserProfile(userId: number): Promise<{ user: UserInfoData }> {
    const user: UserInfoData = await this.findUserInfo(userId);
    if (user) {
      user.follower = user.follower as [];
      user.follower = user.follower.length;
      user.following = user.following as [];
      user.following = user.following.length;
      user.point = user.point as [];
      user.point = user.point.reduce(
        (pre: number, current: { point: number }) => {
          return pre + current.point;
        },
        0,
      );
    }
    return user ? { user } : NotFoundUser();
  }

  // 사용자 팔로잉 or 팔로워 목록 조회
  async findUserFollows(
    userId: number,
    followType: FollowFilter,
  ): Promise<{ users: UserInfoData[] }> {
    const rows: UserFollowRow[] = await this.followRepository.findFollowUsers(
      userId,
      followType,
    );
    const users = rows.map((row) => {
      const user = row.otherId as UserInfoData;
      user.point = user.point as [];
      user.point = user.point.reduce(
        (pre: number, current: { point: number }) => pre + current.point,
        0,
      );
      return user;
    });

    return { users };
  }

  // 나의 차단 목록 조회
  async getUserBlocks(userId: number): Promise<{ users: UserInfoData[] }> {
    const rows: UserBlockRow[] = await this.blockRepository.findBlockUsers(
      userId,
    );
    const users = rows.map((row) => {
      const user = row.otherId as UserInfoData;
      user.point = user.point as [];
      user.point = user.point.reduce(
        (pre: number, current: { point: number }) => pre + current.point,
        0,
      );
      return user;
    });

    return { users };
  }

  // 사용자 프로필 수정
  async updateMyProfile(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    const { nickname } = updateUserDto;
    await this.findUserByNickname(userId, nickname);
    await this.userRepository.updateUserProfile(userId, updateUserDto);
  }

  // 다른 사용자 팔로잉/취소
  async followingOtherOrCancel(userId: number, otherId: number): Promise<void> {
    const user = await this.findUserInfo(userId);
    const other = await this.findUserInfo(otherId);

    user.userId === other.userId && SpecialFail();
    const follow = await this.followRepository.findFollow(userId, otherId);

    follow
      ? await this.followRepository.followCancel(follow.id)
      : await this.followRepository.followDone(userId, other.userId);
  }

  // 다른 사용자 차단/취소
  async blockOtherOrCancel(userId: number, otherId: number): Promise<void> {
    const user = await this.findUserInfo(userId);
    const other = await this.findUserInfo(otherId);

    user.userId === other.userId && SpecialFail();
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
          userId,
          otherId,
        );

        // 팔로잉 & 팔로워 상태 끊기
        await this.followRepository.followCancelTransaction(
          queryRunner,
          userId,
          otherId,
        );
      }
      await queryRunner.commitTransaction();
    } catch (e) {
      error = e;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    error && InternalDBError();
  }
}
