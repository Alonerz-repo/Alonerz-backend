import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StickerException {
  NotFound() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['삭제되었거나 존재하지 않는 스티커입니다.'],
      error: 'Not Found',
    });
  }
}
