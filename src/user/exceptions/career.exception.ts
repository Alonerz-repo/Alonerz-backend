import {
  HttpStatus,
  NotFoundException,
  PayloadTooLargeException,
} from '@nestjs/common';

export class CareerException {
  tooLarge() {
    throw new PayloadTooLargeException({
      statusCode: HttpStatus.PAYLOAD_TOO_LARGE,
      message: ['커리어 정보는 최대 2개로 제한됩니다.'],
      error: 'Payload Too Large',
    });
  }
  notFound() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['커리어 정보를 불러오는데 실패하였습니다.'],
      error: 'Not found',
    });
  }
}
