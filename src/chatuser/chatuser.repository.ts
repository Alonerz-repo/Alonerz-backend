import { EntityRepository, QueryRunner, Repository } from 'typeorm';
import { ChatUser } from './chatuser.entity';

@EntityRepository(ChatUser)
export class ChatUserRepository extends Repository<ChatUser> {
  // 자신이 참여중인 채팅방 조회
  async findUserChatRooms(userId: string) {
    return await this.createQueryBuilder('chatusers')
      .withDeleted()
      .select('chatusers.id')
      .leftJoin('chatusers.user', 'user')
      .addSelect(['user.userId', 'user.nickname', 'user.imageUrl'])
      .leftJoin('chatusers.room', 'room')
      .select(['room.roomId'])
      .leftJoin('room.users', 'users')
      .addSelect(['users.user'])
      .leftJoin('users.user', 'chatuser')
      .addSelect(['chatuser.userId', 'chatuser.nickname', 'chatuser.imageUrl'])
      .where(`user.userId = :userId`, { userId })
      .andWhere(
        'chatusers.deletedAt IS NULL OR chatusers.updatedAt > chatusers.deletedAt',
      )
      .getRawMany();
  }

  // 유저가 채팅방에 (재)참가한 시간 조회 : updateAt
  async findChatUserEnterTime(roomId: string, userId: string) {
    const chatUser = await this.createQueryBuilder('chatusers')
      .select('chatusers.updatedAt')
      .where('chatusers.room = :roomId', { roomId })
      .andWhere('chatusers.user = :userId', { userId })
      .getOne();

    return chatUser.updatedAt;
  }

  // 채팅방 존재 여부 확인 (UserId, OtherId) : roomId
  async findRoomByUserIds(userId: string, otherId: string) {
    const room = await this.createQueryBuilder('chatusers')
      .where('chatusers.user = :userId', { userId })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('OtherUser.room')
          .from(ChatUser, 'OtherUser')
          .where('OtherUser.user = :otherId', { otherId })
          .getQuery();
        return 'chatusers.room IN ' + subQuery;
      })
      .getRawOne();

    return room ? room.chatusers_room : undefined;
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

  // 채팅방 목록에서 직접 채팅방을 나가기
  async deleteChatUser(roomId: string, userId: string) {
    await this.softDelete({ user: userId, room: roomId });
  }
}
