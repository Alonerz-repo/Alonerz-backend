import { Logger } from '@nestjs/common';
import { AppModule } from './module/app.module';
import { useApplication } from './common/application';
import 'dotenv/config';

async function bootstrap() {
  const logger = new Logger();
  const port = process.env.PORT;
  const app = await useApplication(AppModule);
  await app.listen(port, '0.0.0.0');
  logger.log(`Alonerz server running on port ${port}`);
}
bootstrap();
