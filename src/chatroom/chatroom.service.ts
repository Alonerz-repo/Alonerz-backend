import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatUserRepository } from 'src/chatuser/chatuser.repository';
import { Connection } from 'typeorm';
import { ChatRoomRepository } from './chatroom.repository';
import { CreateChatRoomDto } from './dto/create-chatroom.dto';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoomRepository)
    private readonly chatRoomRepository: ChatRoomRepository,
    @InjectRepository(ChatUserRepository)
    private readonly chatUserRepository: ChatUserRepository,
    private readonly connection: Connection,
  ) {}

  // 자신이 참여중인 채팅방 조회
  // 레거시 코드이므로 상황에 맞게 수정하세요.
  async getChatRooms(userId: string) {
    const rows = await this.chatUserRepository.findUserChatRooms(userId);
    const rooms = rows.map((row: any) => {
      const room = row.room;
      room.users = room.users.map((user: any) => user.user);
      return room;
    });
    return { rooms };
  }

  // 1:1 채팅방 생성 및 참여
  // 레거시 코드이므로 상황에 맞게 수정하세요.
  async createChatRoom(userId: string, createChatRoomDto: CreateChatRoomDto) {
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
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error',
        message: ['트랜젝션 오류'],
      });
    }

    return { roomId: room.roomId };
  }
}
