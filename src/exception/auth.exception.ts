import {
  ForbiddenException,
  HttpStatus,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

export const InvaluedToken = () => {
  throw new UnauthorizedException({
    statusCode: HttpStatus.UNAUTHORIZED,
    message: ['로그인이 필요합니다.'],
    error: 'Unauthorized',
  });
};

export const ExpiredToken = () => {
  throw new ForbiddenException({
    statusCode: HttpStatus.FORBIDDEN,
    message: ['토큰이 만료되었습니다.'],
    error: 'Forbidden',
  });
};

export const UnknownError = (infoMessage: string) => {
  throw new InternalServerErrorException({
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: ['토큰 유효성 검사 중 예기치 않은 오류가 발생하였습니다.'],
    error: infoMessage,
  });
};
