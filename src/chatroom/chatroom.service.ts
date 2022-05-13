import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ChatRoomException } from './chatroom.exception';
import { ChatRoomRepository } from './chatroom.repository';
import { ChatUserRepository } from './chatuser.repository';
import { CreateChatRoomDto } from './dto/create-chatroom.dto';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoomRepository)
    private readonly chatRoomRepository: ChatRoomRepository,
    @InjectRepository(ChatUserRepository)
    private readonly chatUserRepository: ChatUserRepository,
    private readonly chatRoomException: ChatRoomException,
    private readonly connection: Connection,
  ) {}

  // 자신이 참여중인 채팅방 조회
  async getChatRooms(userId: number) {
    const rows = await this.chatUserRepository.findUserChatRooms(userId);
    const rooms = rows.map((row: any) => {
      const room = row.room;
      room.users = room.users.map((user: any) => user.user);
      return room;
    });
    return { rooms };
  }

  // 1:1 채팅방 생성 및 참여
  async createChatRoom(userId: number, createChatRoomDto: CreateChatRoomDto) {
    const { otherId } = createChatRoomDto;
    let room = await this.chatRoomRepository.findChatRoomWithOther(otherId);

    let error = null;

    if (!room) {
      room = await this.chatRoomRepository.createChatRoom();
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        await this.chatUserRepository.enterChatRoomTransaction(
          queryRunner,
          userId,
          room.roomId,
        );
        await this.chatUserRepository.enterChatRoomTransaction(
          queryRunner,
          otherId,
          room.roomId,
        );
        await queryRunner.commitTransaction();
      } catch (e) {
        error = e;
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    }

    if (error) {
      await this.chatRoomRepository.deleteChatRoom(room.roomId);
      return this.chatRoomException.Transaction();
    }

    return { roomId: room.roomId };
  }
}
