import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { kakaoConstants } from 'src/common/constants';
import { KakaoPayload } from 'src/common/interface';
import { KakaoProfileDto } from '../dto/kakao.profile.dto';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: kakaoConstants.clientID,
      callbackURL: kakaoConstants.callbackURL,
    });
  }

  async validate(accessToken: string, _: string, profile: any, done: any) {
    const user: KakaoProfileDto = profile._json;
    // TODO : 이부분 수정
    const payload: any = {};
    done(null, payload);
  }
}
