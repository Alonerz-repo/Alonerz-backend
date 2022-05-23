import { EntityRepository, Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { selectChats } from './select/selectChats';
import { selectUsers } from './select/selectUsers';

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {
  // 채팅 존재 여부 확인
  async findOneByChatId(chatId: number) {
    return await this.createQueryBuilder('chats')
      .leftJoin('chats.user', 'user')
      .addSelect(['user.userId'])
      .where('chats.chatId = :chatId', { chatId })
      .getOne();
  }

  // 채팅 조회 : 채팅방 입장
  async findManyByRoomId(roomId: string, joinRoomAt: Date) {
    return await this.createQueryBuilder('chats')
      .select(selectChats)
      .leftJoin('chats.user', 'user')
      .addSelect(selectUsers)
      .where('chats.roomId = :roomId', { roomId })
      .andWhere('chats.deletedAt IS NULL')
      .andWhere('chats.createdAt > :joinRoomAt', { joinRoomAt })
      .orderBy('chats.chatId', 'DESC')
      .limit(10)
      .getMany();
  }

  // 채팅 조회 : 페이징 처리
  async findManyByRoomIdWithOffset(
    roomId: string,
    offset: number,
    joinRoomAt: Date,
  ) {
    return await this.createQueryBuilder('chats')
      .select(selectChats)
      .leftJoin('chats.user', 'user')
      .addSelect(selectUsers)
      .where('chats.roomId = :roomId', { roomId })
      .andWhere('chats.deletedAt IS NULL')
      .andWhere('chats.createdAt > :joinRoomAt', { joinRoomAt })
      .andWhere('chats.chatId < :offset', { offset })
      .orderBy('chats.chatId', 'DESC')
      .limit(10)
      .getMany();
  }

  // 채팅 저장
  async createChat(roomId: string, userId: string, message: string) {
    return await this.save({ roomId: roomId, user: userId, message });
  }

  // 채팅 삭제
  async deleteByChatId(chatId: number) {
    return await this.softDelete(chatId);
  }
}
