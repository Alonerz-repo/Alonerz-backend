import { NestFactory } from '@nestjs/core';
import { setAppFactory } from './app.factory';
import { AppModule } from './app.module';
import { OrmConfig } from './config/orm.config';

new OrmConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await setAppFactory(app);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
