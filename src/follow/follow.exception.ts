import {
  HttpStatus,
  ImATeapotException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class FollowException {
  // 사용자 조회 실패
  NotFound() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['삭제되었거나 존재하지 않는 사용자입니다.'],
      error: 'Not Found',
    });
  }

  // 자기 자신 팔로우
  AreYouTired() {
    throw new ImATeapotException({
      statusCode: HttpStatus.I_AM_A_TEAPOT,
      message: ['혹시 너무 지치셨나요?', '커피 한 잔 하고 오세요.'],
      error: 'I am a Teapot',
    });
  }
}
