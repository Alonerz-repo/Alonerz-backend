import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoomRepository } from 'src/chatroom/chatroom.repository';
import { ChatRepository } from './chat.repository';
import { ChatUserRepository } from 'src/chatuser/chatuser.repository';
import { SelectChatsDto } from './dto/request/select-chats.dto';
import { CreateChatDto } from './dto/request/create-chat.dto';
import { DeleteChatDto } from './dto/request/delete-chat.dto';
import { SelectedChatsDto } from './dto/response/selected-chats.dto';
import { ChatException } from './chat.exception';
import { ChatRoomException } from 'src/chatroom/chatroom.exception';
import { ChatUserException } from 'src/chatuser/chatuser.exception';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRepository)
    private readonly chatRepository: ChatRepository,
    @InjectRepository(ChatRoomRepository)
    private readonly chatRoomRepository: ChatRoomRepository,
    @InjectRepository(ChatUserRepository)
    private readonly chatUserRepository: ChatUserRepository,
    private readonly chatException: ChatException,
    private readonly chatRoomException: ChatRoomException,
    private readonly chatUserException: ChatUserException,
  ) {}

  // 채팅방 존재 여부 확인 (RoomId)
  private async getRoomByRoomId(roomId: string) {
    const room = await this.chatRoomRepository.findOneByRoomId(roomId);
    if (!room) {
      this.chatRoomException.NotFound();
    }
    return room;
  }

  // 채팅 존재 여부 확인
  private async getOneByChatId(chatId: number) {
    const chat = await this.chatRepository.findOneByChatId(chatId);

    if (!chat) {
      this.chatException.NotFound();
    }
    return chat;
  }

  // 채팅방 참가 시간 조회 (roomId, userId)
  private async getDateByUserId(roomId: string, userId: string) {
    const joinRoomAt = await this.chatUserRepository.findChatUserEnterTime(
      roomId,
      userId,
    );
    if (!joinRoomAt) {
      this.chatUserException.NotFound();
    }
    return joinRoomAt;
  }

  // 채팅 조회 : 페이징 처리
  async getManyByRoomIdWithOffset(selectChatsDto: SelectChatsDto) {
    const { roomId, userId, offset } = selectChatsDto;

    this.getRoomByRoomId(roomId);

    // 유저가 채팅방에 참가한 시간 조회
    const joinRoomAt = await this.getDateByUserId(roomId, userId);

    const chats = await this.chatRepository.findManyByRoomIdWithOffset(
      roomId,
      offset,
      joinRoomAt,
    );

    return new SelectedChatsDto(chats);
  }

  // 채팅 저장
  async create(createChatDto: CreateChatDto) {
    const { roomId, userId, message } = createChatDto;

    // CreateChatDto에 roomId가 없다면, userId, otherId로 채팅방 조회
    this.getRoomByRoomId(roomId);

    // 채팅 생성
    return await this.chatRepository.createChat(roomId, userId, message);
  }

  // 채팅 삭제
  async deleteByChatId(deleteChatDto: DeleteChatDto) {
    const { userId, chatId } = deleteChatDto;

    const chat = await this.getOneByChatId(chatId);
    if (chat.user['userId'] !== userId) {
      this.chatException.AccessDenined();
    }
    await this.chatRepository.deleteByChatId(chatId);
    return;
  }
}
