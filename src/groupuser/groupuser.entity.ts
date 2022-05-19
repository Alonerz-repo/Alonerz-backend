import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Group } from '../group/group.entity';

@Entity('groupusers')
export class GroupUser {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;

  @ManyToOne(() => Group, (group) => group.groupId)
  @JoinColumn({ name: 'groupId' })
  groupId: string;

  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'guest' })
  guest: string;
}
