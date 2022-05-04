import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create.user.dto';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Kakao 계정으로 회원가입
  async createKakaoUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.save(createUserDto);
  }

  // KakaoId로 사용자 정보 조회(Career와 1:N 관계, eager-loading)
  async findUserByKakaoId(kakaoId: string): Promise<User> {
    return await this.findOne({ kakaoId });
  }
}
