import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatUserRepository } from './chatuser.repository';

@Injectable()
export class ChatUserService {
  constructor(
    @InjectRepository(ChatUserRepository)
    private chatUserRepository: ChatUserRepository,
  ) {}

  // 자신이 참여중인 채팅방 조회
  async findUserChatRooms(userId: string) {
    return await this.chatUserRepository.findUserChatRooms(userId);
  }
}
