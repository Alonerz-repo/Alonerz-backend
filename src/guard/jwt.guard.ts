import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from 'src/common/interface';
import {
  ExpiredToken,
  InvaluedToken,
  UnknownError,
} from 'src/exception/auth.exception';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest(_: any, user: any, info: any) {
    if (info) {
      switch (info.message) {
        case 'No auth token':
        case 'jwt malformed':
          return InvaluedToken();
        case 'jwt expired':
          return ExpiredToken();
        default:
          return UnknownError(info.message);
      }
    }
    return user;
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const secret = configService.get('secret');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: Payload) {
    return {
      userId: payload.userId,
      kakaoId: payload.kakaoId,
      nickname: payload.nickname,
    };
  }
}
