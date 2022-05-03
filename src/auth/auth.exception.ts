import { HttpStatus, NotFoundException } from '@nestjs/common';

export class AuthException {
  notFound() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['사용자 정보를 찾을 수 없습니다.'],
      error: 'Not found',
    });
  }
}
