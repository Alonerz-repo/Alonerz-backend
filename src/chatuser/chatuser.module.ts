import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatUserRepository } from './chatuser.repository';
import { ChatUserService } from './chatuser.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatUserRepository])],
  providers: [ChatUserService, ChatUserRepository],
  exports: [ChatUserService],
})
export class ChatUserModule {}
