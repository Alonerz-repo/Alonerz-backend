import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_follows')
export class UserFollow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fromUser' })
  userId: User;

  @ManyToOne(() => User, (user) => user.userId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'toUser' })
  otherUserId: User;
}
