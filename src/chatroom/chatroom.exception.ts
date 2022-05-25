import {
  HttpStatus,
  NotFoundException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class ChatRoomException {
  NotFound() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['삭제되었거나, 존재하지 않는 채팅방입니다.'],
      error: 'Not Found',
    });
  }

  // DB 트랜젝션 오류
  Transaction() {
    throw new InternalServerErrorException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: ['처리 중에 예기치 않은 오류가 발생하였습니다.'],
      error: 'Internal Server Error',
    });
  }
}
