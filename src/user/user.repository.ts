import { EntityRepository, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // 사용자 정보 조회
  public async findUserByUserId(userId: number): Promise<User> {
    return await this.findOne(userId);
  }

  // 사용자 프로필 등록 및 수정
  public async updateUserProfile(
    userId: number,
    kakaoId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.update({ userId, kakaoId }, updateUserDto);
  }
}
