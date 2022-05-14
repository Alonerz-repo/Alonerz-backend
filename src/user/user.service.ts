import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    private userException: UserException,
  ) {}

  // 사용자 존재 여부 확인
  private async findUserByUserId(userId: number) {
    const user = await this.userRepository.findOne(userId);
    return user ? user : this.userException.NotFoundUser();
  }

  // 사용자 정보 조회
  private async findUserInfo(userId: number): Promise<User> {
    const user = await this.userRepository.findUserInfo(userId);
    console.log(user);
    if (!user) {
      this.userException.NotFoundUser();
    }
    return user;
  }

  // 닉네임 중복성 검사
  private async findUserByNickname(userId: number, nickname: string) {
    const user = await this.userRepository.findOne({ nickname });
    if (user) {
      if (user.userId !== userId) {
        this.userException.AlreadyUsedNickname();
      }
    }
    return user;
  }

  // 사용자 프로필 조회
  async getUserProfile(userId: number) {
    const user: UserInfoRow = await this.findUserInfo(userId);
    if (user) {
      user.follower = user.follower as [];
      user.followers = user.follower.map((other: any) => other.userId.userId);
      user.follower = user.followers.length;
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
    if (!user) {
      this.userException.NotFoundUser();
    }
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
