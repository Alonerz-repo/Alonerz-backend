import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { JwtPayload } from 'src/common/interfaces';
import { configs } from 'src/common/configs';

const { secret } = configs.jwt;
const strategyOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // 만료 여부를 별도로 확인하기 위해 잠시 true로 설정
  ignoreExpiration: true,
  secretOrKey: secret,
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(strategyOptions);
  }

  async validate(payload: JwtPayload) {
    // payload의 만료일자를 통해 만료 여부 확인 후 커스텀 예외 처리
    // 또는, refreshToken으로 accessToken 재발급
    return {
      userId: payload.userId,
      kakaoId: payload.kakaoId,
    };
  }
}
