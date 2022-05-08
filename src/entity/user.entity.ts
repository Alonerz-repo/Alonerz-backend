import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Career } from './career.entity';
import { UserCareer } from './user-career.entity';
import { UserFollow } from './user-follow.entity';
import { UserPoint } from './user-point.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column('varchar')
  kakaoId: string;

  @Column({ type: 'varchar', default: String(Date.now()) })
  nickname: string;

  @OneToOne(() => Career)
  @JoinColumn({ name: 'career' })
  career: Career;

  @Column({ type: 'varchar', default: null })
  profileImageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;

  @OneToMany(() => UserPoint, (userPoint) => userPoint.userId)
  @JoinColumn({ name: 'point' })
  point: UserPoint[];
}
