import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoomRepository } from 'src/chatroom/chatroom.repository';
import { ChatRepository } from './chat.repository';
import { Connection } from 'typeorm';
import { ChatUserRepository } from 'src/chatuser/chatuser.repository';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRepository)
    private readonly chatRepository: ChatRepository,
    @InjectRepository(ChatRoomRepository)
    private readonly chatRoomRepository: ChatRoomRepository,
    @InjectRepository(ChatUserRepository)
    private readonly chatUserRepository: ChatUserRepository,
    private readonly connection: Connection,
  ) {}

  // 채팅방 존재 여부 확인 (RoomId)
  private async getRoomByRoomId(roomId: string) {
    const room = await this.chatRoomRepository.findOneByRoomId(roomId);
    if (!room) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['삭제되었거나, 존재하지 않는 채팅방입니다.'],
        error: 'Not Found',
      });
    }
    return room;
  }

  // 채팅 존재 여부 확인
  private async getOneByChatId(chatId: number) {
    const chat = await this.chatRepository.findOneByChatId(chatId);

    if (!chat) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['삭제되었거나, 존재하지 않는 채팅 내용입니다.'],
        error: 'Not Found',
      });
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
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['삭제되었거나, 존재하지 않는 유저 채팅 정보입니다.'],
        error: 'Not Found',
      });
    }
    return joinRoomAt;
  }

  // 채팅 조회 : 페이징 처리
  async getManyByRoomIdWithOffset(
    roomId: string,
    userId: string,
    offset: number,
  ) {
    // 유저가 채팅방에 참가한 시간 조회
    const joinRoomAt = await this.getDateByUserId(roomId, userId);

    return await this.chatRepository.findManyByRoomIdWithOffset(
      roomId,
      offset,
      joinRoomAt,
    );
  }

  // 채팅 저장
  async create(roomId: string, userId: string, message: string) {
    // CreateChatDto에 roomId가 없다면, userId, otherId로 채팅방 조회
    this.getRoomByRoomId(roomId);

    // 채팅 생성
    return await this.chatRepository.createChat(roomId, userId, message);
  }

  // 채팅 삭제
  async deleteByChatId(userId: string, chatId: number) {
    const chat = await this.getOneByChatId(chatId);
    if (chat.user['userId'] !== userId) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['자신이 작성한 메세지만 삭제 가능합니다.'],
        error: 'Not Found',
      });
    }
    await this.chatRepository.deleteByChatId(chatId);
  }
}
