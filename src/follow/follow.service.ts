import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowType } from 'src/common/interface';
import { UserInfoRow } from 'src/user/row/user-info.row';
import { UserRepository } from 'src/user/user.repository';
import { FollowException } from './follow.exception';
import { FollowRepository } from './follow.repository';
import { FollowRow } from './row/user-follow.row';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(FollowRepository)
    private readonly followRepository: FollowRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly followException: FollowException,
  ) {}

  // 계정 조회
  private async findUser(userId: number) {
    const user = await this.userRepository.findOne({ userId });
    if (!user) {
      this.followException.NotFound();
    }
    return user;
  }

  // 팔로잉 또는 팔로워 목록 조회
  async findFollows(userId: number, followType: FollowType) {
    const joinner = followType === 'following' ? 'otherId' : 'userId';
    const rows: FollowRow[] = await this.followRepository.findFollowUsers(
      userId,
      followType,
    );
    const users = rows.map((row) => {
      const user = row[joinner] as UserInfoRow;
      user.point = user.point as [];
      user.point = user.point.reduce(
        (pre: number, current: { point: number }) => pre + current.point,
        0,
      );
      return user;
    });
    return { users };
  }

  // 팔로잉 또는 팔로잉 상태 철회
  async followOrCancel(userId: number, otherId: number): Promise<void> {
    if (userId === otherId) {
      this.followException.AreYouTired();
    }

    const user = await this.findUser(userId);
    const other = await this.findUser(otherId);
    const follow = await this.followRepository.findFollow(userId, otherId);

    follow
      ? await this.followRepository.cancel(follow.id)
      : await this.followRepository.follow(user.userId, other.userId);
  }
}
