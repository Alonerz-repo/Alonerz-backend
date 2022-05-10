import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Double,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  groupId: number;

  @ManyToOne(() => User, (user) => user.userId)
  @Column('int')
  hostUserId: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  menu: string;

  @Column('date')
  startAt: Date;

  @Column('date')
  endAt: Date;

  @Column('int')
  limit: number;

  @Column('text')
  description: string;

  @Column('varchar')
  imageUrl: string;

  @Column('double')
  locationX: Double;

  @Column('double')
  locationY: Double;

  @Column('varchar')
  address1: string;

  @Column('varchar')
  address2: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;
}
