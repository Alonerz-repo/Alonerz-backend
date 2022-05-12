import {
  HttpStatus,
  NotFoundException,
  ForbiddenException,
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
