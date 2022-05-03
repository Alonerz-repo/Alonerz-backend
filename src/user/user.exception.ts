import { HttpStatus, NotFoundException } from '@nestjs/common';

export class UserException {
  notFound() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['사용자 정보를 불러오는데 실패하였습니다.'],
      error: 'Not found',
    });
  }
}
