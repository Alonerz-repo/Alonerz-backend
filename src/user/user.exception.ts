import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UserException {
  // 사용자 조회 실패
  NotFoundUser() {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: ['삭제되었거나 존재하지 않는 사용자입니다.'],
      error: 'Not Found',
    });
  }

  // 닉네임 중복
  AlreadyUsedNickname() {
    throw new ConflictException({
      statusCode: HttpStatus.CONFLICT,
      message: [`이미 사용중인 닉네임 입니다.`],
      error: 'Conflict',
    });
  }
}
