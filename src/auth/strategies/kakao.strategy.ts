import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { kakaoConstants } from 'src/common/constants';
import { KakaoAccount } from 'src/common/interfaces';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: kakaoConstants.clientID,
      callbackURL: kakaoConstants.callbackURL,
    });
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
