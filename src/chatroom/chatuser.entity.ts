import { User } from 'src/user/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChatRoom } from './chatroom.entity';

@Entity('chatusers')
export class ChatUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: string;

  @ManyToOne(() => ChatRoom, (room) => room.roomId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room' })
  room: string;
}
