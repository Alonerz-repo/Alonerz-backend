import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserException } from './user.exception';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private userException: UserException,
  ) {}

  // 사용자 정보 조회
  public async otherUserInfo(userId: number) {
    const user = await this.userRepository.findUserByUserId(userId);
    if (!user) this.userException.notFound();
    return user;
  }

  // 사용자 프로필 등록 및 수정
  public async updateProfile(
    userId: number,
    kakaoId: string,
    updateUserDto: UpdateUserDto,
  ) {
    await this.otherUserInfo(userId);
    await this.userRepository.updateUserProfile(userId, kakaoId, updateUserDto);
  }
}
