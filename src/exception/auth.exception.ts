import { HttpStatus, UnauthorizedException } from '@nestjs/common';

export class AuthException {
  unauthorized() {
    throw new UnauthorizedException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: ['로그인이 필요합니다.'],
      error: 'Unauthorized',
    });
  }
}
