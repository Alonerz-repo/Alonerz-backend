import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtTokens } from 'src/common/interfaces';
import { AuthException } from './auth.exception';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    private readonly authException: AuthException,
    private jwtService: JwtService,
  ) {}

  // 카카오 로그인 및 회원가입
  public async kakaoLoginOrSignup(kakaoId: string): Promise<JwtTokens> {
    let user = await this.authRepository.signinWithKakao(kakaoId);
    if (!user) {
      user = await this.authRepository.signupWithKakao(kakaoId);
    }
    const payload = { userId: user.userId, kakaoId: user.kakaoId };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: 'refreshTokenTest',
    };
  }

  // 현재 로그인한 사용자 정보 조회
  public async whoAmI(userId: number, kakaoId: string) {
    const user = await this.authRepository.whoAmI(userId, kakaoId);
    if (!user) this.authException.notFound();
    if (user.deletedAt) this.authException.forbidden();
    delete user.createdAt;
    delete user.updatedAt;
    delete user.deletedAt;
    return user;
  }
}
