import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthException } from 'src/auth/auth.exception';
import { ChatRepository } from 'src/chat/chat.repository';
import { ChatUserException } from 'src/chatuser/chatuser.exception';
import { ChatUserRepository } from 'src/chatuser/chatuser.repository';
import { ChatRoomException } from './chatroom.exception';
import { ChatRoomRepository } from './chatroom.repository';
import { ChatRoomService } from './chatroom.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChatRoomRepository,
      ChatRepository,
      ChatUserRepository,
    ]),
  ],
  providers: [
    AuthException,
    ChatRoomService,
    ChatRoomException,
    ChatUserException,
  ],
  exports: [ChatRoomService],
})
export class ChatRoomModule {}
