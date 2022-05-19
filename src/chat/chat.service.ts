import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoomRepository } from 'src/chatroom/chatroom.repository';
import { ChatRepository } from './chat.repository';
import { v4 } from 'uuid';
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

  // 채팅방 & 채팅유저 생성
  private async createChatRoomUser(
    roomId: string,
    userId: string,
    otherId: string,
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let error = null;
    try {
      // 채팅방 생성
      await this.chatRoomRepository.createChatRoomTransaction(
        queryRunner,
        roomId,
      );
      // 채팅 유저 내 정보 생성
      await this.chatUserRepository.createChatUserTransaction(
        queryRunner,
        userId,
        roomId,
      );
      // 채팅 유저 상대 정보 생성
      await this.chatUserRepository.createChatUserTransaction(
        queryRunner,
        otherId,
        roomId,
      );

      await queryRunner.commitTransaction();
    } catch (e) {
      error = e;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['처리 중에 예기치 않은 오류가 발생하였습니다.'],
        error: 'Internal Server Error',
      });
    }
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

  // 채팅 조회 : 최초 로드
  async getManybyRoomId(roomId: string, joinRoomAt: Date) {
    return await this.chatRepository.findManybyRoomId(roomId, joinRoomAt);
  }

  // 채팅 조회 : 페이징 처리
  async getManyByRoomIdWithOffset(
    roomId: string,
    offset: number,
    joinRoomAt: Date,
  ) {
    return await this.chatRepository.findManyByRoomIdWithOffset(
      roomId,
      offset,
      joinRoomAt,
    );
  }

  // 채팅 저장
  async create(
    roomId: string,
    userId: string,
    otherId: string,
    message: string,
  ) {
    // CreateChatDto에 roomId가 없다면, userId, otherId로 채팅방 찾기
    if (!roomId) {
      roomId = await this.chatRoomRepository.findOneByUserId(userId, otherId);
    }

    // userId, otherId로 찾은 채팅방이 없다면, 채팅방 생성(채팅방은 있지만 1명이 나간 상태일 경우(한명은 null or update가 delete이후, 다른 한명은 delete가 update이후) 처리 필요)
    if (!roomId) {
      roomId = v4();
      this.createChatRoomUser(roomId, userId, otherId);
    }

    // 채팅 생성
    return await this.chatRepository.createChat(roomId, userId, message);
  }

  // 채팅 삭제
  async deleteByChatId(chatId: number) {
    this.getOneByChatId(chatId);
    await this.chatRepository.deleteByChatId(chatId);
  }
}
