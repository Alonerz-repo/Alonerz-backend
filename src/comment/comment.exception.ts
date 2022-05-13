import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CommentException {
  NotFound() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['삭제되었거나 존재하지 않는 댓글입니다.'],
      error: 'Not Found',
    });
  }

  AccessDenined() {
    throw new ForbiddenException({
      statusCode: HttpStatus.FORBIDDEN,
      message: ['해당 댓글의 수정 또는 삭제 권한이 없습니다.'],
      error: 'Forbidden',
    });
  }
}
