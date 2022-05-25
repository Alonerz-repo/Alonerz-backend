import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRepository } from 'src/chat/chat.repository';
import { ChatUserRepository } from 'src/chatuser/chatuser.repository';
import { Connection } from 'typeorm';
import { ChatRoomRepository } from './chatroom.repository';
import { v4 } from 'uuid';
import { DeleteChatRoomDto } from './dto/request/delete-chatroom.dto';
import { SelectChatRoomDto } from './dto/request/select-chatroom.dto';
import { SelectedChatsDto } from 'src/chat/dto/response/selected-chats.dto';
import { ChatRoomException } from './chatroom.exception';
import { ChatUserException } from 'src/chatuser/chatuser.exception';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoomRepository)
    private readonly chatRoomRepository: ChatRoomRepository,
    @InjectRepository(ChatRepository)
    private readonly chatRepository: ChatRepository,
    @InjectRepository(ChatUserRepository)
    private readonly chatUserRepository: ChatUserRepository,
    private readonly chatRoomException: ChatRoomException,
    private readonly chatUserException: ChatUserException,
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
      this.chatRoomException.Transaction();
    }
  }

  // 채팅방 존재 여부 확인 (RoomId)
  private async getOneByRoomId(roomId: string) {
    const room = await this.chatRoomRepository.findOneByRoomId(roomId);
    if (!room) {
      this.chatRoomException.NotFound();
    }
    return room;
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

  // 채팅방 입장 시 최근 메세지 조회
  private async getChatsByRoomId(roomId: string, userId: string) {
    // 유저가 채팅방에 참가한 시간 조회
    const joinRoomAt = await this.getDateByUserId(roomId, userId);

    // 채팅 조회
    const chats = await this.chatRepository.findManyByRoomId(
      roomId,
      joinRoomAt,
    );
    return new SelectedChatsDto(roomId, chats);
  }

  // 채팅방 입장 (채팅방 목록)
  async enterRoomByList(selectChatRoomDto: SelectChatRoomDto) {
    const { roomId, userId } = selectChatRoomDto;
    await this.getOneByRoomId(roomId);

    // 최근 메세지 조회
    const chats = this.getChatsByRoomId(roomId, userId);

    return chats;
  }

  // 채팅방 입장 (1대1 DM)
  async enterRoomByDM(selectChatRoomDto: SelectChatRoomDto) {
    const { userId, otherId } = selectChatRoomDto;

    // userId와 otherId로 roomId를 찾는다
    let roomId = await this.chatUserRepository.findRoomByUserIds(
      userId,
      otherId,
    );

    // userId, otherId로 찾은 채팅방이 없다면, 채팅방 생성
    if (!roomId) {
      roomId = v4();
      await this.createChatRoomUser(roomId, userId, otherId);
      return;
    }

    // 최근 메세지 조회
    const chats = this.getChatsByRoomId(roomId, userId);

    return chats;
  }

  // 채팅방 목록에서 직접 채팅방을 나가기
  async leaveChatRoom(deleteChatRoomDto: DeleteChatRoomDto) {
    const { roomId, userId } = deleteChatRoomDto;

    await this.getOneByRoomId(roomId);

    // 채팅 유저 삭제 처리
    await this.chatUserRepository.deleteChatUser(roomId, userId);

    return;
  }

  // 상대방과의 채팅방에서 나가는 경우
  async exitChatRoom(deleteChatRoomDto: DeleteChatRoomDto) {
    const { roomId } = deleteChatRoomDto;

    await this.getOneByRoomId(roomId);

    // 채팅 조회
    const chat = await this.chatRepository.findOne({ roomId });
    if (!chat) {
      await this.chatRoomRepository.delete(roomId);
    }
    return;
  }
}
