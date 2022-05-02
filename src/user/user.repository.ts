import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findOneByEmail(email: string) {
    return await this.findOne({ email });
  }

  // KakaoId로 사용자 정보 조회
  async findOneByKakaoId(kakaoId: number): Promise<User> {
    return await this.findOne({ kakaoId });
  }

  // 서비스 UserId로 사용자 정보 조회
  async findOneByUserId(userId: number): Promise<User> {
    return await this.findOne({ userId });
  }

  // 서비스 회원가입
  async createServiceUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.save(createUserDto);
  }

  // 카카오 계정으로 회원가입
  async createKakaoUser(kakaoUserDto: any): Promise<User> {
    return await this.save(kakaoUserDto);
  }
}
