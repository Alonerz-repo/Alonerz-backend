import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRepository } from './chat.repository';
import { ChatService } from './chat.service';
import { ChatRoomRepository } from 'src/chatroom/chatroom.repository';
import { ChatUserRepository } from 'src/chatuser/chatuser.repository';
import { ChatException } from './chat.exception';
import { ChatRoomException } from 'src/chatroom/chatroom.exception';
import { ChatUserException } from 'src/chatuser/chatuser.exception';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChatRepository,
      ChatRoomRepository,
      ChatUserRepository,
    ]),
  ],
  providers: [ChatService, ChatException, ChatRoomException, ChatUserException],
  exports: [ChatService],
})
export class ChatModule {}
