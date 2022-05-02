import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // TODO : 카카오 계정으로만 로그인하는 경우 제거
  // Email로 사용자 정보 조회
  async findOneByEmail(email: string) {
    return await this.findOne({ email });
  }

  // TODO : 카카오 계정으로만 로그인하는 경우 제거
  // 서비스 UserId로 사용자 정보 조회
  async findOneByUserId(userId: number): Promise<User> {
    return await this.findOne({ userId });
  }

  // TODO : 카카오 계정으로만 로그인하는 경우 제거
  // 서비스 회원가입
  async createServiceUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.save(createUserDto);
  }

  // KakaoId로 사용자 정보 조회
  async findOneByKakaoId(kakaoId: number): Promise<User> {
    return await this.findOne({ kakaoId });
  }

  // 카카오 계정으로 회원가입
  async createKakaoUser(kakaoUserDto: any): Promise<User> {
    return await this.save(kakaoUserDto);
  }
}
