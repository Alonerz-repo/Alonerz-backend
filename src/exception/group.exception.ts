import {
  HttpStatus,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';

export const NotFoundGroup = () => {
  throw new NotFoundException({
    statusCode: HttpStatus.NOT_FOUND,
    message: ['삭제되었거나 존재하지 않는 그룹입니다.'],
    error: 'Not Found',
  });
};

export const ForbiddenGroup = () => {
  throw new ForbiddenException({
    statusCode: HttpStatus.FORBIDDEN,
    message: ['해당 그룹의 수정 또는 삭제 권한이 없습니다.'],
    error: 'Forbidden',
  });
};

export const BadRequestAny = () => {
  throw new BadRequestException({
    statusCode: HttpStatus.BAD_REQUEST,
    message: ['잘못된 요청입니다.'],
    error: 'Bad Request',
  });
};

export const BadRequestGroup = () => {
  throw new BadRequestException({
    statusCode: HttpStatus.BAD_REQUEST,
    message: ['방장은 그룹을 지켜야합니다.'],
    error: 'Bad Request',
  });
};

export const NotFoundComment = () => {
  throw new NotFoundException({
    statusCode: HttpStatus.NOT_FOUND,
    message: ['삭제되었거나 존재하지 않는 댓글입니다.'],
    error: 'Not Found',
  });
};

export const ForbiddenComment = () => {
  throw new ForbiddenException({
    statusCode: HttpStatus.FORBIDDEN,
    message: ['해당 댓글의 수정 또는 삭제 권한이 없습니다.'],
    error: 'Forbidden',
  });
};
