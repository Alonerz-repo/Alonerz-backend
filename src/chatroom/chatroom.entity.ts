import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatUser } from './chatuser.entity';

@Entity('chatrooms')
export class ChatRoom {
  @PrimaryGeneratedColumn()
  roomId: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => ChatUser, (chatUser) => chatUser.room)
  @JoinColumn({ name: 'users' })
  users: number[];
}
