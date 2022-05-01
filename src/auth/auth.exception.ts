import {
  ForbiddenException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

export class AuthException {
  notFound() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['등록되지 않은 사용자입니다.'],
      error: 'Not found',
    });
  }

  notMatch() {
    throw new ForbiddenException({
      statusCode: HttpStatus.FORBIDDEN,
      message: ['이메일 또는 비밀번호를 확인하세요.'],
      error: 'Forbidden',
    });
  }
}
