import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLoginDto } from './dto/user.login.dto';
import { AuthException } from './auth.exception';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { kakaoConstants } from 'src/common/constants';
import { User } from 'src/user/user.entity';
import { JwtPayload, JwtTokens, KakaoPayload } from 'src/common/interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    private exception: AuthException,
  ) {}

  async validateService(userLoginDto: UserLoginDto): Promise<any> {
    const { email, password } = userLoginDto;
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) this.exception.notFound();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) this.exception.notMatch();

    delete user.password;
    return user;
  }

  // 자체 서비스 로그인
  async serviceLogin(user: any): Promise<JwtTokens> {
    const payload = {
      userId: user.userId,
      kakaoId: user.kakaoId,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

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
      userId: user.userId,
      kakaoId: user.kakaoId,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // 현재 로그인 한 사용자 조회
  async getCurrentUser(jwtPayload: JwtPayload) {
    const { userId, kakaoId } = jwtPayload;
    const user = await this.userRepository.findOneByUserId(userId);

    if (kakaoId) {
      const host = 'https://kapi.kakao.com/v2/user/me';
      const response: any = await axios.get(
        `${host}?target_id_type=user_id&target_id=${kakaoId}`,
        {
          headers: {
            Authorization: `KakaoAK ${kakaoConstants.adminID}`,
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
    } else {
      return {
        ...jwtPayload,
        nickname: user.nickname,
        profileImageUrl: null,
        thumbnailImageUrl: null,
        gender: user.gender,
        point: user.point,
      };
    }
  }
}
