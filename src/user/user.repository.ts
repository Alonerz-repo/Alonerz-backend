import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { KakaoUserDto } from './dto/kakao.user.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findOneByEmail(email: string) {
    return await this.findOne({ email });
  }

  // 서비스 자체 회원가입
  async createServiceUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.save(createUserDto);
  }

  // 카카오 계정으로 회원가입
  async createKakaoUser(kakaoUserDto: any): Promise<User> {
    return await this.save(kakaoUserDto);
  }

  // TODO: 카카오 계정 업데이트
  async updateKakaoUser(kakaoUserDto: KakaoUserDto) {
    const { kakaoId } = kakaoUserDto;
  }
}
