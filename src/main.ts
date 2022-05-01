import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverConstants } from './common/constants';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  // CORS 설정
  app.enableCors({
    origin: '*',
    credentials: true,
    allowedHeaders: '*',
  });

  // 유효성 검사 파이프 전역에서 사용
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(serverConstants.port);
  logger.log(`App Listening at ${serverConstants.port}`);
}
bootstrap();

// https://github.com/eslerkang/couti-backend
// https://velog.io/@eslerkang/TIL-NestJSpassport-kakao
