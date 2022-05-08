import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('user_follows')
export class UserFollow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userId, { onDelete: 'CASCADE' })
  @Column('int')
  userId: number;

  @ManyToOne(() => User, (user) => user.userId, { onDelete: 'CASCADE' })
  @Column('int')
  followId: number;
}
