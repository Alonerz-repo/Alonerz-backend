import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SocketAdapter } from './socket-adapter';
import { useSwagger } from './swagger';

export const useApplication = async (
  AppModule: any,
): Promise<INestApplication> => {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new SocketAdapter(app));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  useSwagger(app);
  return app;
};
