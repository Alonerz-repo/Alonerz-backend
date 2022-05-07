import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user_follow')
export class UserFollow {
  @PrimaryGeneratedColumn()
  id: number;

  // 1 : N userId
  @Column('int')
  userId: number;

  // 1 : N userId
  @Column('int')
  followId: number;
}
