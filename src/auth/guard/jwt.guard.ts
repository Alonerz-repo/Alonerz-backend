import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from 'src/common/interface';
import { AuthException } from '../auth.exception';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  @Inject()
  private authException: AuthException;
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(_: any, user: any, info: any) {
    if (info) {
      switch (info.message) {
        case 'No auth token':
        case 'jwt malformed':
          this.authException.InvalidToken();
        case 'jwt expired':
          this.authException.ExpiredToken();
        default:
          this.authException.UnknownError(info.message);
      }
    }
    return user;
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService) {
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
    };
  }
}
