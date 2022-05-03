import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { JwtPayload } from 'src/common/interfaces';
import { configs } from 'src/common/configs';

const { secret } = configs.jwt;
const strategyOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: secret,
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(strategyOptions);
  }

  async validate(payload: JwtPayload) {
    return {
      kakaoId: payload.kakaoId,
    };
  }
}
