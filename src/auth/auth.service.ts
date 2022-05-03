import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { JwtTokens, KakaoPayload } from 'src/common/interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  // KakaoId로 서비스 계정 정보 조회
  private async serviceUser(kakaoId: string): Promise<User> {
    const user = await this.userRepository.findUserByKakaoId(kakaoId);
    return user;
  }

  // KakaoId로 서비스 계정 회원가입 처리
  private async serviceSignup(kakaoId: string): Promise<void> {
    const user = { kakaoId };
    await this.userRepository.createKakaoUser(user);
  }

  // 카카오 로그인 및 회원가입
  async kakaoSignupOrLogin(kakaoPayload: KakaoPayload): Promise<JwtTokens> {
    const { kakaoId } = kakaoPayload;
    const user = this.serviceUser(kakaoId);
    if (!user) await this.serviceSignup(kakaoId);
    return {
      accessToken: this.jwtService.sign({ kakaoId }),
    };
  }
}
