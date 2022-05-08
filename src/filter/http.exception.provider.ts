import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http.exception.filter';

export const HttpExceptionProvider = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
};
