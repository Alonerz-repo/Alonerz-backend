import { EntityRepository, QueryRunner, Repository } from 'typeorm';
import { ChatRoom } from './chatroom.entity';

@EntityRepository(ChatRoom)
export class ChatRoomRepository extends Repository<ChatRoom> {
  // 채팅방 존재 여부 확인 (RoomId)
  async findOneByRoomId(roomId: string) {
    return await this.findOne({ roomId });
  }

  // 채팅방 생성 트랜젝션
  async createChatRoomTransaction(queryRunner: QueryRunner, roomId: string) {
    await queryRunner.manager.save(ChatRoom, { roomId });
  }

  // 채팅방 닫기 (유저 2명이 다 나갔을 시?)
  async deleteChatRoom(roomId: string) {
    return await this.softDelete({ roomId });
  }
}
