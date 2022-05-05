import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtTokens } from 'src/common/interfaces';
import { User } from 'src/user/user.entity';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  // 카카오 로그인 및 회원가입
  public async kakaoLoginOrSignup(kakaoId: string): Promise<JwtTokens> {
    let payload = await this.authRepository.signinWithKakao(kakaoId);
    if (!payload) {
      payload = await this.authRepository.signupWithKakao(kakaoId);
    }
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: 'refreshTokenTest',
    };
  }

  // 현재 로그인한 사용자 정보 조회
  public async whoAmI(userId: number, kakaoId: string): Promise<User> {
    return this.authRepository.whoAmI(userId, kakaoId);
  }
}
