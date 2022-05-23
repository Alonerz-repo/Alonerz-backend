import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthException {
  FailKakaoLogin() {
    throw new UnauthorizedException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: ['카카오 인증에 실패하였습니다.'],
      error: 'Unauthorized',
    });
  }

  InvalidToken() {
    throw new UnauthorizedException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: ['로그인이 필요합니다.'],
      error: 'Unauthorized',
    });
  }

  ExpiredToken() {
    throw new ForbiddenException({
      statusCode: HttpStatus.FORBIDDEN,
      message: ['토큰이 만료되었습니다.'],
      error: 'Forbidden',
    });
  }

  NotFound() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['삭제되었거나 존재하지 않는 계정입니다.'],
      error: 'Not Found',
    });
  }

  UnknownError(infoMessage: string) {
    throw new InternalServerErrorException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: ['토큰 유효성 검사 중 예기치 않은 오류가 발생하였습니다.'],
      error: infoMessage,
    });
  }
}
