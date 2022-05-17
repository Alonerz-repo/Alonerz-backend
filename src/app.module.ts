// import { HttpExceptionModule } from './common/filter/http.exception.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig, typeormConfig } from './common/configs';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { CommentModule } from './comment/comment.module';
import { FollowModule } from './follow/follow.module';
import { BlockModule } from './block/block.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRoot(typeormConfig),
    // HttpExceptionModule,
    AuthModule,
    UserModule,
    FollowModule,
    BlockModule,
    GroupModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
