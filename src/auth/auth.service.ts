import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLoginDto } from './dto/user.login.dto';
import { AuthException } from './auth.exception';
import * as bcrypt from 'bcrypt';
import { KakaoPayload, Payload } from 'src/common/interface';
import axios from 'axios';

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

  async serviceLogin(user: any) {
    const payload: Payload = {
      userId: user.userId,
      email: user.email,
      nickname: user.nickname,
      kakaoId: user.kakaoId,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async kakaoLogin(kakaoPayload: KakaoPayload) {
    const { accessToken } = kakaoPayload;
    // const user = await axios.get('https://kapi.kakao.com/v2/user/me', {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    //   },
    // });
    // console.log(2);

    // TODO : kakaoId로 유저 찾고, 있으면 새로운 토큰 발급, 없으면 새로운 계정 생성

    // const user = await this.userRepository.createUser()

    // const user = await this.userRepository.findOneByEmailOrKakaoId(email, kakaoId);
    // if (!user) {
    //   this.userRepository.createUser()
    // }
  }

  // 카카오 계정 해제
  // TODO : DB에서 카카오 관련 정보 초기화
  async kakaoUnlink(accessToken: string) {
    await axios.post(
      'https://kapi.kakao.com/v1/user/unlink',
      {},
      {
        headers: {
          Authorization: accessToken,
        },
      },
    );
  }
}
