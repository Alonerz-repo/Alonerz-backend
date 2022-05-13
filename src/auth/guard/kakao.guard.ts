import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { AuthException } from '../auth.exception';

interface KakaoStrategyConfig {
  clientID: string;
  callbackURL: string;
  clientSecret: '';
}

@Injectable()
export class KakaoGuard extends AuthGuard('kakao') {}

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private authException: AuthException,
  ) {
    const kakaoStrategyConfig = configService.get<KakaoStrategyConfig>('kakao');
    super(kakaoStrategyConfig);
  }

  async validate(_: string, __: string, profile: any, done: any) {
    const user = profile._json;
    if (!user) {
      this.authException.FailKakaoLogin();
    }
    done(null, user.id);
  }
}
