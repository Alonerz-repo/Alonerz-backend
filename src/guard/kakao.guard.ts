import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

interface KakaoStrategyConfig {
  clientID: string;
  callbackURL: string;
  clientSecret: '';
}

@Injectable()
export class KakaoGuard extends AuthGuard('kakao') {}

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const kakaoStrategyConfig = configService.get<KakaoStrategyConfig>('kakao');
    super(kakaoStrategyConfig);
  }

  // _  : Kakao accessToken
  // __ : Kakao refreshToken
  async validate(_: string, __: string, profile: any, done: any) {
    const user = profile._json;
    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['사용자 정보를 찾을 수 없습니다.'],
        error: 'NotFound',
      });
    }
    done(null, user.id);
  }
}
