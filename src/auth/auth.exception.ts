import {
  HttpStatus,
  ForbiddenException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';

export class AuthException {
  unauthorized() {
    throw new UnauthorizedException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: ['로그인이 필요합니다.'],
      error: 'Unauthorized',
    });
  }
  notFound() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['사용자 정보를 찾을 수 없습니다.'],
      error: 'Not Found',
    });
  }
  forbidden() {
    throw new ForbiddenException({
      statusCode: HttpStatus.FORBIDDEN,
      message: ['이용 정지 상태이거나 삭제된 계정입니다.'],
      error: 'Forbidden',
    });
  }
}
