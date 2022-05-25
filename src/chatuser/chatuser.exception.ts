import { HttpStatus, NotFoundException, Injectable } from '@nestjs/common';

@Injectable()
export class ChatUserException {
  NotFound() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['삭제되었거나, 존재하지 않는 유저 채팅 정보입니다.'],
      error: 'Not Found',
    });
  }
}
