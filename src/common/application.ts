import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useSwagger } from './swagger';

export const useApplication = async (
  AppModule: any,
): Promise<INestApplication> => {
  const app = await NestFactory.create(AppModule);
  useSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  return app;
};
