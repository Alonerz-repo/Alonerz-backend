import { HttpStatus, UnauthorizedException } from '@nestjs/common';

export class AuthException {
  unauthorized() {
    throw new UnauthorizedException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: ['사용자 정보를 찾을 수 없습니다.'],
      error: 'Unauthorized',
    });
  }
}
