import {
  HttpStatus,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';

@Injectable()
export class GroupException {
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

  YouAreHost() {
    throw new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: ['방장은 그룹을 지켜야합니다.'],
      error: 'Bad Request',
    });
  }

  MaximumLimit() {
    throw new ConflictException({
      statusCode: HttpStatus.CONFLICT,
      message: ['참여 가능한 인원이 가득찼습니다.'],
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
