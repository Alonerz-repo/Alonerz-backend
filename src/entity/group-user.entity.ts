import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Group } from './group.entity';
import { User } from './user.entity';

@Entity('group_user')
export class GroupUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userId)
  @Column('int')
  userId: number;

  @ManyToOne(() => Group, (group) => group.groupId)
  @Column('int')
  groupId: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;
}
