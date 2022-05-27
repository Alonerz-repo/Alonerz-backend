import { HttpExceptionModule } from './common/filter/http.exception.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig, typeormConfig } from './common/configs';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StickerModule } from './sticker/sticker.module';
import { GroupModule } from './group/group.module';
import { CommentModule } from './comment/comment.module';
import { FollowModule } from './follow/follow.module';
import { BlockModule } from './block/block.module';
import { SocketModule } from './socket/socket.module';
import { ChatRoomModule } from './chatroom/chatroom.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRoot(typeormConfig),
    HttpExceptionModule,
    SocketModule,
    AuthModule,
    UserModule,
    StickerModule,
    FollowModule,
    BlockModule,
    GroupModule,
    CommentModule,
    ChatRoomModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
