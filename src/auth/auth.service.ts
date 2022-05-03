import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthException } from './auth.exception';
import { User } from 'src/user/user.entity';
import { JwtPayload, JwtTokens, KakaoPayload } from 'src/common/interfaces';
import { configs } from 'src/common/configs';
import axios from 'axios';

const { adminKey } = configs.kakao;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    private exception: AuthException,
  ) {}

  // 카카오 로그인 및 회원가입
  async kakaoSignupOrLogin(kakaoPayload: KakaoPayload): Promise<JwtTokens> {
    const { kakaoId, gender } = kakaoPayload;

    let user: User = await this.userRepository.findOneByKakaoId(kakaoId);

    // 카카오 계정 회원가입 처리
    if (!user) {
      user = await this.userRepository.createKakaoUser({
        kakaoId,
        gender: gender ? gender : null,
      });
    }

    const payload = {
      kakaoId: user.kakaoId,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // 현재 로그인 한 사용자 조회
  async getCurrentUser(jwtPayload: JwtPayload) {
    const { kakaoId } = jwtPayload;
    const user = await this.userRepository.findOneByKakaoId(kakaoId);
    const host = 'https://kapi.kakao.com/v2/user/me';
    const response: any = await axios.get(
      `${host}?target_id_type=user_id&target_id=${kakaoId}`,
      {
        headers: {
          Authorization: `KakaoAK ${adminKey}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );
    const { data } = response;
    return {
      ...jwtPayload,
      nickname: data.properties.nickname,
      profileImageUrl: data.kakao_account.profile.profile_image_url,
      thumbnailImageUrl: data.kakao_account.profile.thumbnail_image_url,
      gender: data.kakao_account.gender,
      point: user.point,
    };
  }
}
