import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_point')
export class UserPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  point: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;

  @ManyToOne((type) => User, (user) => user.userId, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  userId: number;
}
