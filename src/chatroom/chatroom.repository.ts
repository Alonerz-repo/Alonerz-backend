import { EntityRepository, Repository } from 'typeorm';
import { ChatRoom } from './chatroom.entity';

@EntityRepository(ChatRoom)
export class ChatRoomRepository extends Repository<ChatRoom> {
  // 상대방과의 채팅방이 있는지 확인
  // 레거시 코드이므로 상황에 맞게 수정하세요.
  async findChatRoomWithOther(otherId: string) {
    return await this.createQueryBuilder('chatrooms')
      .select(['chatrooms.roomId'])
      .leftJoinAndSelect('chatrooms.users', 'users')
      .leftJoin('users.user', 'user')
      .where('user.userId = :otherId', { otherId })
      .getOne();
  }

  // 채팅방 생성
  // 레거시 코드이므로 상황에 맞게 수정하세요.
  async createChatRoom() {
    return await this.save({});
  }

  // 채팅방 닫기
  // 레거시 코드이므로 상황에 맞게 수정하세요.
  async deleteChatRoom(roomId: string) {
    return await this.softDelete({ roomId });
  }
}
