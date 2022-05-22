import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Payload } from 'src/common/interface';
import { TokenRepository } from 'src/token/token.repository';
import { UserRepository } from 'src/user/user.repository';
import { AuthException } from './auth.exception';
import { User } from 'src/user/user.entity';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(TokenRepository)
    private readonly tokenRepository: TokenRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
    private authException: AuthException,
  ) {}

  // 토큰 쌍 생성
  private generateTokens(payload: Payload) {
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1d' }),
      refreshToken: this.jwtService.sign({}),
    };
  }

  // 사용자 존재 여부 확인
  private async findUser(kakaoId: string) {
    return await this.userRepository.findOne(
      { kakaoId },
      { withDeleted: true },
    );
  }

  // 로그인(최초 로그인 시 회원가입 처리)
  async loginOrSignup(kakaoId: string) {
    const existUser = await this.findUser(kakaoId);
    const user = existUser
      ? existUser
      : await this.userRepository.createUser(kakaoId);

    // TODO : 삭제할 것
    // 계정 복구
    await this.restore(user);

    const { userId, nickname, careerId, yearId, description } = user;
    const needProfile =
      careerId === null || yearId === null || description === null;

    const payload = { userId, kakaoId, nickname };
    const tokens = await this.tokenRepository.saveToken(
      userId,
      kakaoId,
      this.generateTokens(payload),
    );

    return { needProfile, ...tokens };
  }

  // 토큰 재발급
  async reissueTokens(authorization: string, refreshToken: string) {
    const accessToken = (authorization || ' ').split(' ')[1];
    const payload = Object(this.jwtService.decode(accessToken));

    const { userId, kakaoId } = payload;

    if (!userId || !kakaoId) {
      this.authException.InvalidToken();
    }

    const userToken = await this.tokenRepository.findToken(
      userId,
      kakaoId,
      refreshToken,
    );

    const tokens = userToken
      ? await this.tokenRepository.updateToken(
          userId,
          kakaoId,
          refreshToken,
          this.generateTokens(payload),
        )
      : await this.tokenRepository.saveToken(
          userId,
          kakaoId,
          this.generateTokens(payload),
        );

    return { ...tokens, auth: payload };
  }

  // 로그아웃(accessToken 삭제)
  async logout(userId: string, authorization: string) {
    const accessToken = (authorization || ' ').split(' ')[1];
    return await this.tokenRepository.deleteToken(userId, accessToken);
  }

  // TODO : 삭제할 것
  // 계정 복구
  async restore(user: User) {
    const { userId } = user;
    if (user.deletedAt) {
      await this.userRepository.restore({ userId });
    }
  }

  // TODO : 삭제할 것
  // 계정 탈퇴(kakao 계정 탈퇴, 서비스 계정 삭제)
  async unlink(userId: string, kakaoId: string) {
    const kakaoAdmin = this.configService.get('kakaoAdmin');
    const host = 'https://kapi.kakao.com';
    const url = `/v1/user/unlink?target_id_type=user_id&target_id=${kakaoId}`;
    const headers = {
      Authorization: `KakaoAK ${kakaoAdmin}`,
    };

    try {
      await axios.post(`${host}${url}`, {}, { headers });
      await this.userRepository.softDelete({ userId, kakaoId });
    } catch (e) {
      console.log(e);
    }
  }
}
