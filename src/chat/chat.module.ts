import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRepository } from './chat.repository';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRepository])],
  providers: [ChatService, ChatRepository],
  controllers: [ChatController],
})
export class ChatModule {}
