import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { FollowingsDto } from './dto/response/followers.dto';
import { FollowersDto } from './dto/response/followings.dto';
import { FollowException } from './follow.exception';
import { FollowRepository } from './follow.repository';

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
  private async findUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ userId });
    if (!user) {
      this.followException.NotFound();
    }
    return user;
  }

  // 팔로잉 목록 조회
  async getFollowings(userId: string): Promise<FollowingsDto> {
    const users = await this.followRepository.findFollowings(userId);
    return new FollowingsDto(users);
  }

  // 팔로워 목록 조회
  async getFollowers(userId: string): Promise<FollowersDto> {
    const users = await this.followRepository.findFollowers(userId);
    return new FollowersDto(users);
  }

  // 팔로잉 또는 팔로잉 상태 철회
  async followOrCancel(userId: string, otherId: string): Promise<void> {
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
