import { EntityRepository, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { selectUsers } from './select/selectUsers';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // 계정 생성
  async createUser(kakaoId: string) {
    return await this.save({ kakaoId });
  }

  // 사용자 프로필 조회
  async findUserInfo(userId: number) {
    return await this.createQueryBuilder('users')
      .select(selectUsers)
      .leftJoinAndSelect('users.following', 'following')
      .leftJoinAndSelect('users.follower', 'follower')
      .leftJoinAndSelect('follower.userId', 'followerUser')
      .leftJoin('users.point', 'points')
      .addSelect(['points.point'])
      .where('users.userId = :userId', { userId })
      .getOne();
  }

  // 사용자 프로필 수정
  async updateUserProfile(userId: number, updateUserDto: UpdateUserDto) {
    await this.update(userId, updateUserDto);
  }
}
