import { User } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  // userId로 계정 조회
  async findUserByUserId(userId: string): Promise<User> {
    return await this.findOne({ userId }, { withDeleted: true });
  }

  // kakaoId로 계정 조회
  async findUserByKakaoId(kakaoId: string): Promise<User> {
    return await this.findOne({ kakaoId }, { withDeleted: true });
  }

  // 계정 생성
  async createUser(kakaoId: string): Promise<User> {
    return await this.save({ kakaoId });
  }
}
