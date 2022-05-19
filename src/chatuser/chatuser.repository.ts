import { EntityRepository, QueryRunner, Repository } from 'typeorm';
import { ChatUser } from './chatuser.entity';

@EntityRepository(ChatUser)
export class ChatUserRepository extends Repository<ChatUser> {
  // 자신이 참여중인 채팅방 조회
  // 레거시 코드이므로 상황에 맞게 수정하세요
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
      .getMany();
  }

  // 채팅방 생성 후 유저 입장 트랜젝션
  // 레거시 코드이므로 상황에 맞게 수정하세요
  async enterChatRoomTransaction(
    queryRunner: QueryRunner,
    userId: string,
    roomId: string,
  ) {
    await queryRunner.manager.save(ChatUser, {
      user: userId,
      room: roomId,
    });
  }
}
