import {
  ConflictException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

export class UserException {
  notFound() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['등록되지 않은 사용자입니다.'],
      error: 'Not found',
    });
  }

  alreadyExist() {
    throw new ConflictException({
      statusCode: HttpStatus.CONFLICT,
      message: ['이미 등록된 계정입니다.'],
      error: 'Conflict',
    });
  }
}
