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
  @PrimaryGeneratedColumn('uuid')
  roomId: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => ChatUser, (chatUser) => chatUser.room)
  @JoinColumn({ name: 'users' })
  users: string[];
}
