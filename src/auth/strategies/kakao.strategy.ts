import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOption } from 'passport-kakao';
import { KakaoAccount } from 'src/common/interfaces';
import { configs } from 'src/common/configs';

const { restAPIKey, redirectURL } = configs.kakao;
const strategyOption: StrategyOption = {
  clientID: restAPIKey,
  clientSecret: '',
  callbackURL: redirectURL,
};

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(strategyOption);
  }

  // _  : Kakao accessToken
  // __ : Kakao RefreshToken
  async validate(_: string, __: string, profile: any, done: any) {
    const user: KakaoAccount = profile._json;
    const payload = {
      kakaoId: user.id,
      gender: user.kakao_account.gender,
    };
    done(null, payload);
  }
}
