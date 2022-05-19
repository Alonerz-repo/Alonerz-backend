import { ChatUser } from 'src/chatuser/chatuser.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('chatrooms')
export class ChatRoom {
  @PrimaryColumn()
  roomId: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;

  // 채팅방 : 참여자 = 1 : N
  @OneToMany(() => ChatUser, (chatUser) => chatUser.room)
  @JoinColumn({ name: 'users' })
  users: string[];
}
