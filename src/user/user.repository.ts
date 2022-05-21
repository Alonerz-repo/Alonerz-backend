import { EntityRepository, QueryRunner, Repository } from 'typeorm';
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
  async findUserInfo(userId: string) {
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

  // 사용자 프로필 수정 트랜젝션
  async updateUserProfileTransaction(
    queryRunner: QueryRunner,
    userId: string,
    imageUrl: string,
    updateUserDto: UpdateUserDto,
  ) {
    if (imageUrl) {
      return await queryRunner.manager.update(
        User,
        { userId },
        { ...updateUserDto, imageUrl },
      );
    }
    await queryRunner.manager.update(User, { userId }, updateUserDto);
  }

  // 서비스 계정 삭제
  async unlinkUser(userId: string, kakaoId: string) {
    await this.softDelete({ userId, kakaoId });
  }
}
