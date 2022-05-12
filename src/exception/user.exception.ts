import {
  ConflictException,
  HttpStatus,
  ImATeapotException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export const NotFoundUser = () => {
  throw new NotFoundException({
    statusCode: HttpStatus.NOT_FOUND,
    message: ['삭제되었거나 존재하지 않는 사용자입니다.'],
    error: 'Not Found',
  });
};

export const AlreadyUsedFor = (item: string) => {
  throw new ConflictException({
    statusCode: HttpStatus.CONFLICT,
    message: [`이미 사용중인 ${item} 입니다.`],
    error: 'Conflict',
  });
};

export const SpecialFail = () => {
  throw new ImATeapotException({
    statusCode: HttpStatus.I_AM_A_TEAPOT,
    message: [
      '이건 마치 혼자 북치고 장구치는 격이군요!',
      '혹시 너무 지치셨나요?',
      '커피 한 잔 하고 오세요.',
    ],
    error: 'I am a Teapot',
  });
};

export const InternalDBError = () => {
  throw new InternalServerErrorException({
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: ['처리 중에 예기치 않은 오류가 발생하였습니다.'],
    error: 'Internal Server Error',
  });
};
