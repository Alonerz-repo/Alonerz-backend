import {
  HttpStatus,
  NotFoundException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ChatException {
  NotFound() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['삭제되었거나 존재하지 않는 채팅입니다.'],
      error: 'Not Found',
    });
  }

  AccessDenined() {
    throw new ForbiddenException({
      statusCode: HttpStatus.FORBIDDEN,
      message: ['해당 채팅의 수정 또는 삭제 권한이 없습니다.'],
      error: 'Forbidden',
    });
  }
}
