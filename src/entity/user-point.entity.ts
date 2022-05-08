import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_points')
export class UserPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  point: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.userId, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  userId: number;
}
