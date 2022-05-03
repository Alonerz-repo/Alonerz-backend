import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthException } from './auth.exception';
import { User } from 'src/user/user.entity';
import { JwtTokens, KakaoAccount, KakaoPayload } from 'src/common/interfaces';
import { configs } from 'src/common/configs';
import axios from 'axios';

const { adminKey } = configs.kakao;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  // Kakao 사용자 정보 조회 API
  private async kakaoGetUserAPI(kakaoId: string): Promise<KakaoAccount> {
    const host = 'https://kapi.kakao.com/v2/user/me';
    const url = `${host}?target_id_type=user_id&target_id=${kakaoId}`;
    const headers = {
      Authorization: `KakaoAK ${adminKey}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const { data } = await axios.get(url, { headers });
    return data;
  }

  // KakaoId로 서비스 계정 정보 조회
  private async serviceUser(kakaoId: string): Promise<User> {
    const user = await this.userRepository.findUserByKakaoId(kakaoId);
    return user;
  }

  // KakaoId로 서비스 계정 회원가입 처리
  private async serviceSignup(kakaoId: string, gender: string): Promise<void> {
    const user = { kakaoId, gender: gender ? gender : null };
    await this.userRepository.createKakaoUser(user);
  }

  // 카카오 로그인 및 회원가입
  async kakaoSignupOrLogin(kakaoPayload: KakaoPayload): Promise<JwtTokens> {
    const { kakaoId, gender } = kakaoPayload;
    const user = this.serviceUser(kakaoId);
    if (!user) await this.serviceSignup(kakaoId, gender);
    return {
      accessToken: this.jwtService.sign({ kakaoId }),
    };
  }
}
