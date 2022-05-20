import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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

  // 채팅방 존재 여부 확인 (RoomId)
  private async getOneByRoomId(roomId: string) {
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
    // const { otherId } = createChatRoomDto;
    // let room = await this.chatRoomRepository.findChatRoomWithOther(otherId);
    // let error = null;
    // if (!room) {
    //   room = await this.chatRoomRepository.createChatRoom();
    //   const queryRunner = this.connection.createQueryRunner();
    //   await queryRunner.connect();
    //   await queryRunner.startTransaction();
    //   try {
    //     await this.chatUserRepository.enterChatRoomTransaction(
    //       queryRunner,
    //       userId,
    //       room.roomId,
    //     );
    //     await this.chatUserRepository.enterChatRoomTransaction(
    //       queryRunner,
    //       otherId,
    //       room.roomId,
    //     );
    //     await queryRunner.commitTransaction();
    //   } catch (e) {
    //     error = e;
    //     await queryRunner.rollbackTransaction();
    //   } finally {
    //     await queryRunner.release();
    //   }
    // }
    // if (error) {
    //   await this.chatRoomRepository.deleteChatRoom(room.roomId);
    //   throw new InternalServerErrorException({
    //     statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    //     error: 'Internal Server Error',
    //     message: ['트랜젝션 오류'],
    //   });
    // }
    // return { roomId: room.roomId };
  }

  // 채팅방 입장 (채팅방 목록에서)
  async EnterChatRoomToServer(roomId: string) {
    const chats = [];
    return chats;
  }

  // 채팅방 입장 (생성은 메시지 보낼 시)
  async enterRoom(enterRoomDto) {
    // (1:1 DM을 통해 채팅방에 간접적으로 들어오는 경우)
    // { userId } AND { otherId }에 해당하는 roomId 조회
    // 없으면 { roomId } 생성

    // (채팅목록을 통해 채팅방에 직접적으로 들어온 경우)
    // 해당 roomId 사용

    // roomId로 최근 채팅내역 조회 후 emit
    const chats = [];
    return;
  }
}
