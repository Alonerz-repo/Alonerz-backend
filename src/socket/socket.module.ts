import { Module } from '@nestjs/common';
import { ChatModule } from 'src/chat/chat.module';
import { ChatRoomModule } from 'src/chatroom/chatroom.module';
import { ChatUserModule } from 'src/chatuser/chatuser.module';
import { ClientModule } from 'src/client/client.module';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [ChatModule, ChatRoomModule, ChatUserModule, ClientModule],
  providers: [SocketGateway],
})
export class SocketModule {}
