import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // KakaoId로 사용자 정보 조회
  async findOneByKakaoId(kakaoId: string): Promise<User> {
    return await this.findOne({ kakaoId });
  }

  // 카카오 계정으로 회원가입
  async createKakaoUser(kakaoUserDto: any): Promise<User> {
    return await this.save(kakaoUserDto);
  }
}
