import {
  ForbiddenException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

export class UserException {
  notFound() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['사용자 정보를 찾을 수 없습니다.'],
      error: 'Not found',
    });
  }
  forbidden() {
    throw new ForbiddenException({
      statusCode: HttpStatus.FORBIDDEN,
      message: ['삭제되었거나 이용 정지 상태의 계정입니다.'],
      error: 'Forbidden',
    });
  }
}
