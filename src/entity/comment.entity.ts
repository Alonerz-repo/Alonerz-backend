import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Group } from './group.entity';
import { User } from './user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @ManyToOne(() => Group, (group) => group.groupId)
  @Column('int')
  groupId: number;

  @Column({ type: 'int', default: null })
  parentId: number;

  @ManyToOne(() => User, (user) => user.userId)
  @Column('int')
  userId: number;

  @Column('text')
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;
}
