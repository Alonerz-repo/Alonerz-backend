import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOption } from 'passport-kakao';
import { configs } from 'src/common/constants';
import { KakaoAccount } from 'src/common/interfaces';

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
    const {
      id,
      kakao_account: { gender },
    } = user;
    const payload = {
      kakaoId: id,
      gender,
    };
    done(null, payload);
  }
}
