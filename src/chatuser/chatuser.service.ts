import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SelectChatRoomsDto } from 'src/chatroom/dto/request/select-chatrooms.dto';
import { ChatUserRepository } from './chatuser.repository';
import { SelectedChatRoomsDto } from 'src/chatroom/dto/response/selected-chatrooms.dto';

@Injectable()
export class ChatUserService {
  constructor(
    @InjectRepository(ChatUserRepository)
    private chatUserRepository: ChatUserRepository,
  ) {}

  // 자신이 참여중인 채팅방 조회
  async findUserChatRooms(selectChatRoomsDto: SelectChatRoomsDto) {
    const { userId } = selectChatRoomsDto;
    const chatrooms = await this.chatUserRepository.findUserChatRooms(userId);
    return new SelectedChatRoomsDto(chatrooms);
  }
}
