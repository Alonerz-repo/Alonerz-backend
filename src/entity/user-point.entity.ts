import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('user_point')
export class UserPoint {
  @PrimaryGeneratedColumn()
  id: number;

  // 1 : N userId
  @Column('int')
  userId: number;

  @Column('int')
  point: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
