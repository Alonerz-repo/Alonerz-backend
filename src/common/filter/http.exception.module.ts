import { Module, Logger } from '@nestjs/common';
import { HttpExceptionProvider } from './http.exception.provider';

@Module({
  providers: [Logger, HttpExceptionProvider],
})
export class HttpExceptionModule {}
