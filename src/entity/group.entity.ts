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
import { GroupUser } from './group-user.entity';
import { User } from './user.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  groupId: number;

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

  // 개발모드에서는 default : null
  @Column({ type: 'datetime', default: null })
  startAt: Date;

  // 개발모드에서는 default : null
  @Column({ type: 'datetime', default: null })
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
  host: number;

  @OneToMany(() => GroupUser, (gropuUser) => gropuUser.groupId, {
    cascade: true,
  })
  @JoinColumn({ name: 'guests' })
  guests: number[];
}
