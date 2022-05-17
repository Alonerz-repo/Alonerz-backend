import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Double,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { GroupUser } from './groupuser.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  groupId: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  menu: string;

  @Column('varchar')
  placeName: string;

  @Column('text')
  description: string;

  @Column({ type: 'varchar', default: null })
  imageUrl: string;

  @Column({ type: 'datetime' })
  startAt: Date;

  @Column({ type: 'datetime' })
  endAt: Date;

  @Column('int')
  limit: number;

  @Column('double')
  locationX: Double;

  @Column('double')
  locationY: Double;

  @Column('varchar')
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'host' })
  host: string;

  @OneToMany(() => GroupUser, (groupUser) => groupUser.groupId, {
    cascade: true,
  })
  @JoinColumn({ name: 'guests' })
  guests: string[];

  @OneToMany(() => Comment, (comment) => comment.groupId, { cascade: true })
  @JoinColumn({ name: 'comments' })
  comments: number[];
}
