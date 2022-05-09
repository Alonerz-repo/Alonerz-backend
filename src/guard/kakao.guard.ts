import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { AuthException } from 'src/exception/auth.exception';

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
    private readonly exception: AuthException,
    private readonly configService: ConfigService,
  ) {
    const kakaoStrategyConfig = configService.get<KakaoStrategyConfig>('kakao');
    super(kakaoStrategyConfig);
  }

  // _  : Kakao accessToken
  // __ : Kakao refreshToken
  async validate(_: string, __: string, profile: any, done: any) {
    const user = profile._json;
    if (!user) this.exception.unauthorized();
    done(null, user.id);
  }
}
