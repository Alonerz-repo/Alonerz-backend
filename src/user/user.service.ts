import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockRepository } from 'src/block/block.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInfoRow } from './row/user-info.row';
import { User } from './user.entity';
import { UserException } from './user.exception';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(BlockRepository)
    private blockRepository: BlockRepository,
    private userException: UserException,
  ) {}

  // 사용자 존재 여부 확인
  private async findUserByUserId(userId: number) {
    const user = await this.userRepository.findOne(userId);
    return user ? user : this.userException.NotFoundUser();
  }

  // 사용자 정보 조회
  private async findUserInfo(otherId: number): Promise<User> {
    const user = await this.userRepository.findUserInfo(otherId);
    if (!user) {
      this.userException.NotFoundUser();
    }
    return user;
  }

  // 닉네임 중복성 검사
  private async findUserByNickname(userId: number, nickname: string) {
    const user = await this.userRepository.findOne({ nickname });
    if (user && user.userId !== userId) {
      this.userException.AlreadyUsedNickname();
    }
    return user;
  }

  // 사용자 프로필 조회
  async getUserProfile(userId: number, otherId: number) {
    const user: UserInfoRow = await this.userRepository.findUserInfo(otherId);

    if (!user) {
      this.userException.NotFoundUser();
    }

    if (userId !== otherId) {
      const myBlocks = await this.blockRepository.findBlockUserId(userId);
      const myBlockIds = myBlocks.map((user: any) => user.otherId.userId);

      // 내가 해당 계정을 차단한 경우
      if (myBlockIds.includes(otherId)) {
        return this.userException.BlockedUser();
      }

      const otherBlocks = await this.blockRepository.findBlockUserId(otherId);
      const otherBlockIds = otherBlocks.map((user: any) => user.otherId.userId);

      // 내가 차단당한 경우
      if (otherBlockIds.includes(userId)) {
        return this.userException.IwasBlocked();
      }
    }

    const followers = user.follower as [];
    user.followers = followers.map((other: any) => other.userId.userId);
    user.follower = user.followers.length;

    const following = user.following as [];
    user.following = following.length;

    const point = user.point as [];
    user.point = point.reduce((pre: number, point: { point: number }) => {
      return pre + point.point;
    }, 0);

    return { user };
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
}
