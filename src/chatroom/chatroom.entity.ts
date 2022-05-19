import { ChatUser } from 'src/chatuser/chatuser.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('chatrooms')
export class ChatRoom {
  @PrimaryGeneratedColumn('uuid')
  roomId: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  // 채팅방 : 참여자 = 1 : N
  @OneToMany(() => ChatUser, (chatUser) => chatUser.room)
  @JoinColumn({ name: 'users' })
  users: string[];
}
