import { UpdateUserDto } from 'src/dto/user.dto';
import { User } from 'src/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // 계정 생성
  async createUser(kakaoId: string) {
    return await this.save({ kakaoId });
  }

  // 사용자 프로필 조회
  async findUserInfo(userId: number) {
    return await this.createQueryBuilder('users')
      .select([
        'users.userId',
        'users.nickname',
        'users.profileImageUrl',
        'users.careerId',
        'users.year',
        'users.description',
      ])
      .leftJoinAndSelect('users.following', 'following')
      .leftJoinAndSelect('users.follower', 'follower')
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
