import {
  ForbiddenException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class GroupException {
  notFound() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['그룹 정보를 찾을 수 없습니다.'],
      error: 'Not found',
    });
  }
  forbidden() {
    throw new ForbiddenException({
      statusCode: HttpStatus.FORBIDDEN,
      message: ['삭제되었거나 참여 불가능한 그룹입니다.'],
      error: 'Forbidden',
    });
  }
  unauthorized() {
    throw new UnauthorizedException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: ['로그인이 필요합니다.'],
      error: 'Unauthorized',
    });
  }
}
