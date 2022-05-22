import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
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

  // 내가 차단당한 경우
  IwasBlocked() {
    this.NotFoundUser();
  }

  // 내가 차단한 경우
  BlockedUser() {
    throw new ForbiddenException({
      statusCode: HttpStatus.FORBIDDEN,
      message: ['차단한 사용자이므로 접근할 수 없습니다.'],
      error: 'Forbidden',
    });
  }

  // 이미지 파일이 없는 경우
  NotImage() {
    throw new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: ['이미지 파일을 선택하세요.'],
      error: 'Bad Request',
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

  // DB 트랜젝션 오류
  Transaction() {
    throw new InternalServerErrorException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: ['처리 중에 예기치 않은 오류가 발생하였습니다.'],
      error: 'Internal Server Error',
    });
  }
}
