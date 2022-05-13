import {
  HttpStatus,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class ChatRoomException {
  NotFound() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['삭제되었거나 존재하지 않는 그룹입니다.'],
      error: 'Not Found',
    });
  }

  AccessDenined() {
    throw new ForbiddenException({
      statusCode: HttpStatus.FORBIDDEN,
      message: ['해당 그룹의 수정 또는 삭제 권한이 없습니다.'],
      error: 'Forbidden',
    });
  }

  BadRequest() {
    throw new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: ['잘못된 요청입니다.'],
      error: 'Bad Request',
    });
  }

  // DB 트랜젝션 오류
  Transaction() {
    throw new InternalServerErrorException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: ['채팅방을 생성하는 도중에 예기치 않은 오류가 발생하였습니다.'],
      error: 'Internal Server Error',
    });
  }
}
