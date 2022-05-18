import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Group } from '../group/group.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @ManyToOne(() => Group, (group) => group.groupId)
  @JoinColumn({ name: 'groupId' })
  groupId: string;

  @Column({ type: 'int', default: null })
  parentId: number;

  @Column({ type: 'int', default: 0 })
  childComments: number;

  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'userId' })
  userId: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;
}
