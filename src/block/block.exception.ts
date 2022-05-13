import {
  HttpStatus,
  ImATeapotException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class BlockException {
  // 사용자 조회 실패
  NotFound() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['삭제되었거나 존재하지 않는 사용자입니다.'],
      error: 'Not Found',
    });
  }
  // 자기 자신 차단
  AreYouTired() {
    throw new ImATeapotException({
      statusCode: HttpStatus.I_AM_A_TEAPOT,
      message: ['혹시 너무 지치셨나요?', '커피 한 잔 하고 오세요.'],
      error: 'I am a Teapot',
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
