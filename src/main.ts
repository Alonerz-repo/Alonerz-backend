import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configs } from './common/constants';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  // CORS 설정
  app.enableCors({
    origin: '*',
    credentials: true,
    allowedHeaders: '*',
  });

  // 유효성 검사 파이프 설정
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = configs.server.port;
  await app.listen(port);
  logger.log(`App Listening at ${port}`);
}
bootstrap();

// https://github.com/eslerkang/couti-backend
// https://velog.io/@eslerkang/TIL-NestJSpassport-kakao
