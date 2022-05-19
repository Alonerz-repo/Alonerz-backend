import { EntityRepository, QueryRunner, Repository } from 'typeorm';
import { ChatRoom } from './chatroom.entity';

@EntityRepository(ChatRoom)
export class ChatRoomRepository extends Repository<ChatRoom> {
  // 채팅방 존재 여부 확인 (RoomId)
  async findOneByRoomId(roomId: string) {
    return await this.findOne({ roomId });
  }

  // 채팅방 존재 여부 확인 (UserId, OtherId) - 로직 변경 필요
  async findOneByUserId(userId: string, otherId: string) {
    // const userRoomIds = await this.createQueryBuilder('chatrooms')
    //   .select(['chatrooms.roomId'])
    //   .leftJoinAndSelect('chatrooms.users', 'users')
    //   .leftJoin('users.user', 'user')
    //   .where('user.userId = :userId', { userId })
    //   .getMany();
    // const otherRoomIds = await this.createQueryBuilder('chatrooms')
    //   .select(['chatrooms.roomId'])
    //   .leftJoinAndSelect('chatrooms.users', 'users')
    //   .leftJoin('users.user', 'user')
    //   .where('user.userId = :otherId', { otherId })
    //   .getMany();
    // const roomId = userRoomIds.filter((it) => otherRoomIds.includes(it))[0];
    // return roomId ? String(roomId) : undefined;

    // 임시 코드 (삭제하셔도 됩니다). return roomId
    return 'hrsnisrgnouivrnioar';
  }

  // 채팅방 생성 트랜젝션
  async createChatRoomTransaction(queryRunner: QueryRunner, roomId: string) {
    await queryRunner.manager.save(ChatRoom, { roomId });
  }

  // 채팅방 닫기 (유저 2명이 다 나갔을 시)
  async deleteChatRoom(roomId: string) {
    return await this.softDelete({ roomId });
  }
}
