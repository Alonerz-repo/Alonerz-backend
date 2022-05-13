import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthException } from 'src/auth/auth.exception';
import { UserRepository } from 'src/user/user.repository';
import { ChatRoomController } from './chatroom.controller';
import { ChatRoomService } from './chatroom.service';
import { ChatRoomRepository } from './chatroom.repository';
import { ChatUserRepository } from './chatuser.repository';
import { ChatRoomException } from './chatroom.exception';

@Module({
  imports: [
    AuthException,
    TypeOrmModule.forFeature([
      ChatRoomRepository,
      ChatUserRepository,
      UserRepository,
    ]),
  ],
  controllers: [ChatRoomController],
  providers: [ChatRoomService, AuthException, ChatRoomException],
})
export class ChatModule {}
