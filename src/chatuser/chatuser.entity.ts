import { ChatRoom } from 'src/chatroom/chatroom.entity';
import { User } from 'src/user/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chatusers')
export class ChatUser {
  @PrimaryGeneratedColumn()
  id: number;

  // 참여자 : 채팅방 = N : 1
  @ManyToOne(() => ChatRoom, (room) => room.roomId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room' })
  room: string;

  // 참여자 : 사용자 = N : 1
  @ManyToOne(() => User, (user) => user.userId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: string;
}
