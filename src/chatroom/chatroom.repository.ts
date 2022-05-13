import { EntityRepository, Repository } from 'typeorm';
import { ChatRoom } from './chatroom.entity';

@EntityRepository(ChatRoom)
export class ChatRoomRepository extends Repository<ChatRoom> {
  // 상대방과의 채팅방이 있는지 확인
  async findChatRoomWithOther(otherId: number) {
    return await this.createQueryBuilder('chatrooms')
      .select(['chatrooms.roomId'])
      .leftJoinAndSelect('chatrooms.users', 'users')
      .leftJoin('users.user', 'user')
      .where('user.userId = :otherId', { otherId })
      .getOne();
  }

  // 채팅방 생성
  async createChatRoom() {
    return await this.save({});
  }

  // 채팅방 닫기
  async deleteChatRoom(roomId: number) {
    return await this.softDelete({ roomId });
  }
}
