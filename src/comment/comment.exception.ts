import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CommentException {
  // 조회 불가
  NotFound() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['삭제되었거나 존재하지 않는 댓글입니다.'],
      error: 'Not Found',
    });
  }

  // 수정 또는 삭제 권한 없음
  AccessDenined() {
    throw new ForbiddenException({
      statusCode: HttpStatus.FORBIDDEN,
      message: ['해당 댓글의 수정 또는 삭제 권한이 없습니다.'],
      error: 'Forbidden',
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
