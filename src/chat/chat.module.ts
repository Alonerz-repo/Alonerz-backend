import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRepository } from './chat.repository';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatRoomRepository } from 'src/chatroom/chatroom.repository';
import { ChatUserRepository } from 'src/chatuser/chatuser.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChatRepository,
      ChatRoomRepository,
      ChatUserRepository,
    ]),
  ],
  providers: [ChatService, ChatRepository],
  controllers: [ChatController],
})
export class ChatModule {}
