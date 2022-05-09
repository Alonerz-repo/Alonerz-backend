import {
  BadRequestException,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from 'src/common/interface';

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
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: ['로그인이 필요합니다.'],
            error: 'Bad Request',
          });
        case 'jwt expired':
          throw new UnauthorizedException({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: ['토큰이 만료되었습니다.'],
            error: 'Unauthorized',
          });
        default:
          return console.log(info.message);
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
    // ErrorCode : 400 - 토큰 형식 오류
    // ErrorCode : 401 - 토큰 만료 오류
    return {
      userId: payload.userId,
      kakaoId: payload.kakaoId,
      nickname: payload.nickname,
    };
  }
}
