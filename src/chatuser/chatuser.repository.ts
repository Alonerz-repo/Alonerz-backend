import { EntityRepository, QueryRunner, Repository } from 'typeorm';
import { ChatUser } from './chatuser.entity';

@EntityRepository(ChatUser)
export class ChatUserRepository extends Repository<ChatUser> {
  // 자신이 참여중인 채팅방 조회
  async findUserChatRooms(userId: string) {
    return await this.createQueryBuilder('chatusers')
      .select('chatusers.id')
      .leftJoin('chatusers.user', 'user')
      .addSelect(['user.userId', 'user.nickname', 'user.profileImageUrl'])
      .leftJoinAndSelect('chatusers.room', 'room')
      .leftJoinAndSelect('room.users', 'users')
      .leftJoin('users.user', 'chatuser')
      .addSelect([
        'chatuser.userId',
        'chatuser.nickname',
        'chatuser.profileImageUrl',
      ])
      .where('user.userId = :userId', { userId })
      .orWhere('chatusers.deleteAt IS NULL')
      .orWhere('chatusers.updateAt > chatusers.deleteAt')
      .getMany();
  }

  // 채팅방 생성 후 유저 입장 정보 생성 트랜젝션
  async createChatUserTransaction(
    queryRunner: QueryRunner,
    userId: string,
    roomId: string,
  ) {
    await queryRunner.manager.save(ChatUser, {
      user: userId,
      room: roomId,
    });
  }

  // 채팅 유저 삭제처리(채팅방 나가기)
  async deleteChatUser(userId: string, roomId: string) {
    await this.softDelete({ user: userId, room: roomId });
  }
}
