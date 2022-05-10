import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig, typeormConfig } from '../common/configs';
import { HttpExceptionModule } from '../filter/http.exception.module';
import { AppController } from '../controller/app.controller';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { GroupModule } from './group.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRoot(typeormConfig),
    HttpExceptionModule,
    AuthModule,
    UserModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
