import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthException } from 'src/auth/auth.exception';
import { ChatRepository } from 'src/chat/chat.repository';
import { ChatUserRepository } from 'src/chatuser/chatuser.repository';
import { ChatRoomController } from './chatroom.controller';
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
  providers: [AuthException, ChatRoomService],
  controllers: [ChatRoomController],
  exports: [ChatRoomService],
})
export class ChatRoomModule {}
